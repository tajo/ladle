import { dirname, join } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { createRequire } from "module";
import ladlePlugin from "./vite-plugin/vite-plugin.js";

const require = createRequire(import.meta.url);

/**
 * @param ladleConfig {import("../shared/types").Config}
 * @param configFolder {string}
 * @param viteConfig {import('vite').InlineConfig}
 */
const getBaseViteConfig = (ladleConfig, configFolder, viteConfig) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  /**
   * @type {import('vite').InlineConfig}
   */
  const config = {
    ...viteConfig,
    configFile: false,
    root: join(__dirname, "../app/"),
    base: ladleConfig.build.baseUrl,
    define: {
      __BROWSER__: true,
      __NODE__: false,
      ...(viteConfig.define ? viteConfig.define : {}),
    },
    cacheDir: join(process.cwd(), "node_modules/.vite"),
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
    plugins: [
      ladlePlugin(ladleConfig, configFolder),
      react({
        babel: {
          presets: [
            require.resolve("@babel/preset-flow"),
            ...ladleConfig.babelPresets,
          ],
          plugins: ladleConfig.babelPlugins,
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
