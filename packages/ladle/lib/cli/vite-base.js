import { dirname, join } from "path";
import { fileURLToPath } from "url";
import globby from "globby";
import path from "path";
import react from "@vitejs/plugin-react";
import ladlePlugin from "./vite-plugin/vite-plugin.js";
import { flowPlugin, esbuildFlowPlugin } from "./strip-flow.js";

/**
 * @param ladleConfig {import("../shared/types").Config}
 * @param configFolder {string}
 * @param viteConfig {import('@miksu/vite').InlineConfig}
 */
const getBaseViteConfig = async (ladleConfig, configFolder, viteConfig) => {
  // entries that vite crawls to find deps for pre-bundling
  const entries = (await globby([ladleConfig.stories])).map((entry) =>
    path.join(process.cwd(), entry),
  );
  const __dirname = dirname(fileURLToPath(import.meta.url));
  /**
   * @type {import('@miksu/vite').InlineConfig}
   */
  const config = {
    ...viteConfig,
    configFile: false,
    root: join(__dirname, "../app/"),
    base: ladleConfig.build.baseUrl,
    define: {
      ...(ladleConfig.define ? ladleConfig.define : {}),
      ...(viteConfig.define ? viteConfig.define : {}),
    },
    cacheDir: join(process.cwd(), "node_modules/.vite"),
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
      ],
      entries,
    },
    plugins: [
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
