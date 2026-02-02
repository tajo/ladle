// @ts-nocheck
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";
import importFrom from "import-from";

import { entryFilePath, mergeConfig } from "./metro-base.js";
import { fileURLToPath } from "url";
import metroDev from "./metro-dev.js";
import {
  createHTMLTemplate,
  getExtraHeaderStuff,
} from "./metro/prepare-assets.js";
import { projectPublicDir } from "./metro/utils.js";
import { getBaseMetroConfig } from "./metro-base.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();
const appRoot = path.resolve(__dirname, "../app");
const outDir = path.resolve(projectRoot, "./build");
const assetsDir = path.resolve(outDir, "./assets");

async function copyFile(from, to) {
  await fs.mkdir(path.dirname(to), { recursive: true });
  return fs.copyFile(from, to);
}

async function writeFile(to, data) {
  await fs.mkdir(path.dirname(to), { recursive: true });
  return fs.writeFile(to, data);
}

// const Metro = importFrom(projectRoot, "metro");
const ServerModule = importFrom(projectRoot, "metro/private/Server");
const Server = ServerModule.default || ServerModule;

// Helper function to prepare the out dir
async function prepareOutDir() {
  if (existsSync(outDir)) {
    await fs.rm(outDir, { recursive: true });
  }

  // Create assetsDir
  await fs.mkdir(assetsDir, { recursive: true });
}

/**
 * @param ladleConfig {import("../shared/types").Config}
 * @param configFolder {string}
 */
const metroProd = async (ladleConfig, configFolder) => {
  // Prepare the build folder
  const cssFile = path.resolve(appRoot, "./ladle.css");

  // Make sure the out dir is cleaned and ready.
  await prepareOutDir();

  const onProgress = (...args) => {
    // TODO: Add CLI indicator.
  };

  const sourceMap = false;

  const baseMetroConfig = await getBaseMetroConfig(undefined, ladleConfig);
  const originalSerializer = baseMetroConfig.serializer?.customSerializer;
  const metroConfig = mergeConfig(baseMetroConfig, {
    serializer: {
      customSerializer: async function (
        entryPoint,
        preModules,
        graph,
        options,
      ) {
        options.serializerOptions = {
          output: "static",
          splitChunks: false,
          includeSourceMaps: false,
        };

        const bundle = await originalSerializer(
          entryPoint,
          preModules,
          graph,
          options,
        );

        /*
         * Metro expects an object with "code" and "map" properties.
         * Expo's serializer returns something completely different.
         * We send Expo's output as `code` here to make Metro happy while keeping Expo's output format.
         * See metroServer.build call below.
         */
        return { code: bundle, map: "" };
      },
    },
    transformer: {
      publicPath: "/assets/?export_path=/assets",
    },
  });

  const { metroServer } = await metroDev(
    ladleConfig,
    configFolder,
    metroConfig,
  );

  /*
   * We can access to Expo's serialized bundle format through `code`.
   * It includes `artifacts` and `assets`. Only thing we have to do
   * is writing/copying the files accordingly.
   */
  const { code: bundle } = await metroServer.build({
    ...Server.DEFAULT_BUNDLE_OPTIONS,
    entryFile: path.relative(
      metroConfig?.server?.unstable_serverRoot || metroConfig.projectRoot,
      entryFilePath,
    ),
    dev: false,
    minify: false,
    platform: "web",
    out: path.resolve(assetsDir, "ladle.js"),
    onProgress,

    sourceMap,
    inlineSourceMap: false,
    bundleType: "bundle",
  });

  const { artifacts, assets } = bundle;

  // Manually copy/write assets
  const filesToCopy = new Map();

  // Copy the files under project's public dir
  if (existsSync(projectPublicDir)) {
    await fs.cp(projectPublicDir, outDir, { recursive: true });
  }

  // Prep assets
  for (const { scales, files, name, type, httpServerLocation } of assets) {
    scales.forEach((scale, index) => {
      const suffix = scale === 1 ? "" : `@${scale}x`;
      const fileName = `${name}${suffix}.${type}`;
      const dest = path.join(
        // Assets can have relative paths outside of the project root.
        // Replace `../` with `_` to make sure they don't end up outside of
        // the expected assets directory.
        httpServerLocation.replace(/^\/+/g, "").replace(/\.\.\//g, "_"),
        fileName,
      );

      filesToCopy.set(dest, files[index]);
    });
  }

  const files = [];
  for (const [dest, src] of filesToCopy) {
    const cp = copyFile(src, path.resolve(outDir, dest));
    files.push(cp);
  }

  // Prep artifacts
  for (const { filename, source } of artifacts) {
    const wr = writeFile(path.resolve(outDir, filename), source);
    files.push(wr);
  }

  // Prep HTML
  const html = createHTMLTemplate({
    appendToHead: getExtraHeaderStuff(ladleConfig, configFolder),
    assets: artifacts,
  });
  files.push(writeFile(path.resolve(outDir, "index.html"), html));

  await Promise.all(files);
};

export default metroProd;
