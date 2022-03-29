import { dirname, isAbsolute, join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import ladlePlugin from "./vite-plugin/vite-plugin.js";
import { flowPlugin, esbuildFlowPlugin } from "./strip-flow.js";

/**
 * @param publicDir {string | false}
 */
const getPublicDir = (publicDir) => {
  if (!publicDir) {
    return false;
  }

  if (isAbsolute(publicDir)) {
    return publicDir;
  }

  return join(process.cwd(), publicDir || "public");
};

/**
 * @param ladleConfig {import("../shared/types").Config}
 * @param configFolder {string}
 * @param viteConfig {import('vite').InlineConfig}
 */
const getBaseViteConfig = async (ladleConfig, configFolder, viteConfig) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  /**
   * @type {import('vite').InlineConfig}
   */
  const config = {
    ...viteConfig,
    configFile: false,
    root: join(__dirname, "../app/"),
    publicDir: getPublicDir(ladleConfig.publicDir),
    base: ladleConfig.build.baseUrl,
    define: {
      ...(ladleConfig.define ? ladleConfig.define : {}),
      ...(viteConfig.define ? viteConfig.define : {}),
    },
    cacheDir: join(process.cwd(), "node_modules/.vite"),
    css: {
      postcss: process.cwd(),
    },
    envDir: process.cwd(),
    envPrefix: ladleConfig.envPrefix,
    resolve: {
      alias: ladleConfig.resolve.alias,
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [esbuildFlowPlugin()],
      },
      include: [
        "react",
        "react-dom",
        "classnames",
        "debug",
        "history",
        "lodash.clonedeep",
        "lodash.merge",
        "query-string",
        "@reach/dialog",
        ...ladleConfig.optimizeDeps.include,
      ],
      entries: [
        path.join(process.cwd(), ".ladle/components.js"),
        path.join(process.cwd(), ".ladle/components.tsx"),
      ],
    },
    plugins: [
      tsconfigPaths({
        root: process.cwd(),
      }),
      flowPlugin(),
      ladlePlugin(ladleConfig, configFolder),
      //@ts-ignore
      react({
        babel: {
          presets: ladleConfig.babelPresets,
          plugins: ladleConfig.babelPlugins,
          compact: true,
        },
      }),
      ...(viteConfig.plugins ? viteConfig.plugins : []),
      ...ladleConfig.vitePlugins,
    ],
    esbuild: {
      include: /\.(tsx?|jsx?)$/,
      exclude: [],
      loader: "tsx",
      ...(viteConfig.esbuild ? viteConfig.esbuild : {}),
    },
  };
  return config;
};

export default getBaseViteConfig;
