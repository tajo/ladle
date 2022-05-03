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

  // We need to fake react-dom/client import in case user still uses React v17
  // and not v18, otherwise Vite would fail the import analysis step
  const reactAlias = {};
  try {
    await import("react-dom/client");
  } catch (e) {
    reactAlias["react-dom/client"] = "react-dom";
  }

  const userVitePlugins = (
    await Promise.all(
      ladleConfig.vitePlugins.map(async (plugin) =>
        typeof plugin === "function" ? plugin() : plugin,
      ),
    )
  ).filter((v) => !!v);

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
      modules: ladleConfig.css.modules,
      postcss: process.cwd(),
    },
    envDir: process.cwd(),
    envPrefix: ladleConfig.envPrefix,
    resolve: {
      alias: {
        ...reactAlias,
        ...ladleConfig.resolve.alias,
      },
    },
    optimizeDeps: {
      ...(ladleConfig.enableFlow
        ? {
            esbuildOptions: {
              plugins: [esbuildFlowPlugin()],
            },
          }
        : {}),
      include: [
        "react",
        "react-dom",
        "classnames",
        "debug",
        "history",
        "lodash.merge",
        "query-string",
        "prism-react-renderer",
        "prism-react-renderer/themes/github",
        "prism-react-renderer/themes/nightOwl",
        "axe-core",
        ...(Object.keys(reactAlias).length ? [] : ["react-dom/client"]),
        ...ladleConfig.optimizeDeps.include,
      ],
      entries: [
        path.join(process.cwd(), ".ladle/components.js"),
        path.join(process.cwd(), ".ladle/components.jsx"),
        path.join(process.cwd(), ".ladle/components.tsx"),
        path.join(process.cwd(), ".ladle/components.ts"),
      ],
    },
    plugins: [
      tsconfigPaths({
        root: process.cwd(),
      }),
      ...(ladleConfig.enableFlow ? [flowPlugin()] : []),
      ladlePlugin(ladleConfig, configFolder),
      //@ts-ignore
      react({
        babel: {
          parserOpts: ladleConfig.babelParserOpts,
          presets: ladleConfig.babelPresets,
          plugins: ladleConfig.babelPlugins,
          compact: true,
        },
      }),
      ...(viteConfig.plugins ? viteConfig.plugins : []),
      ...userVitePlugins,
    ],
    ...(ladleConfig.enableFlow
      ? {
          esbuild: {
            include: /\.(tsx?|jsx?)$/,
            exclude: [],
            loader: "tsx",
          },
        }
      : {}),
  };
  return config;
};

export default getBaseViteConfig;
