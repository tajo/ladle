import { dirname, join } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import ladlePlugin from "./vite-plugin/vite-plugin.js";
import { flowPlugin, esbuildFlowPlugin } from "./strip-flow.js";

/**
 * @param ladleConfig {import("../shared/types").Config}
 * @param configFolder {string}
 * @param viteConfig {import('@miksu/vite').InlineConfig}
 */
const getBaseViteConfig = (ladleConfig, configFolder, viteConfig) => {
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
      __BROWSER__: true,
      __NODE__: false,
      process: {
        env: {},
      },
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
