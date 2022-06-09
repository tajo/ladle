import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import ladlePlugin from "./vite-plugin/vite-plugin.js";
import mergeViteConfigs from "./merge-vite-configs.js";
import getUserViteConfig from "./get-user-vite-config.js";

/**
 * @param ladleConfig {import("../shared/types").Config}
 * @param configFolder {string}
 * @param viteConfig {import('vite').InlineConfig}
 */
const getBaseViteConfig = async (ladleConfig, configFolder, viteConfig) => {
  const _removedLadleConfigOptions = [
    "publicDir",
    "enableFlow",
    "babelParserOpts",
    "babelPresets",
    "babelPlugins",
    "vitePlugins",
    "css",
    "envPrefix",
    "define",
    "resolve",
    "optimizeDeps",
    "serve",
    "build",
  ];

  // we moved all vite settings into vite.config.js, fail legacy Ladle configs
  // remove this later
  let oldKeyUsed = false;
  Object.keys(ladleConfig).forEach((configKey) => {
    if (_removedLadleConfigOptions.includes(configKey)) {
      console.error(
        `ERROR: ${configKey} was removed from the Ladle config in v1. Move it to vite.config.js. https://ladle.dev/docs/config`,
      );
      oldKeyUsed = true;
    }
  });
  oldKeyUsed && process.exit(1);

  const __dirname = dirname(fileURLToPath(import.meta.url));

  // We need to fake react-dom/client import in case user still uses React v17
  // and not v18, otherwise Vite would fail the import analysis step
  const reactAlias = {};
  try {
    await import("react-dom/client");
  } catch (e) {
    reactAlias["react-dom/client"] = "react-dom";
  }

  const { userViteConfig, hasReactPlugin, hasTSConfigPathPlugin } =
    await getUserViteConfig(
      viteConfig.build ? "build" : "serve",
      viteConfig.mode || "production",
      ladleConfig.viteConfig,
    );

  /**
   * @type {import('vite').InlineConfig}
   */
  const config = {
    ...viteConfig,
    configFile: false,
    root: join(__dirname, "../app/"),
    css: {
      postcss: process.cwd(),
    },
    envDir: process.cwd(),
    resolve: {
      alias: {
        ...reactAlias,
      },
    },
    optimizeDeps: {
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
      ],
      entries: [
        path.join(process.cwd(), ".ladle/components.js"),
        path.join(process.cwd(), ".ladle/components.jsx"),
        path.join(process.cwd(), ".ladle/components.tsx"),
        path.join(process.cwd(), ".ladle/components.ts"),
      ],
    },
    plugins: [
      !hasTSConfigPathPlugin &&
        tsconfigPaths({
          root: process.cwd(),
        }),
      ladlePlugin(ladleConfig, configFolder, viteConfig.mode || ""),
      !hasReactPlugin && react(),
    ],
  };
  return mergeViteConfigs(userViteConfig, config);
};

export default getBaseViteConfig;
