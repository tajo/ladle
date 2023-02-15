import { join } from "path";
import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import getAppRoot from "./get-app-root.js";
import ladlePlugin from "./vite-plugin/vite-plugin.js";
import debug from "./debug.js";
import mergeViteConfigs from "./merge-vite-configs.js";
import getUserViteConfig from "./get-user-vite-config.js";
import mdxPlugin from "./vite-plugin/mdx-plugin.js";

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

  const {
    userViteConfig,
    hasReactPlugin,
    hasReactSwcPlugin,
    hasTSConfigPathPlugin,
  } = await getUserViteConfig(
    viteConfig.build ? "build" : "serve",
    viteConfig.mode || "production",
    ladleConfig.viteConfig,
  );

  debug("User provided @vite/plugin-react: %s", hasReactPlugin);
  debug("User provided @vite/plugin-react-swc: %s", hasReactSwcPlugin);

  // We need to fake react-dom/client import if the user still uses React v17
  // and not v18, otherwise Vite would fail the import analysis step
  const resolve = {};
  try {
    await import("react-dom/client");
  } catch (e) {
    // If the user already has custom `resolve.alias` configured, we must match
    // the same format. This logic is heavily inspired from:
    // https://github.com/rollup/plugins/blob/985cf4c422896ac2b21279f0f99db9d281ef73c2/packages/alias/src/index.ts#L19-L34

    if (Array.isArray(userViteConfig.resolve?.alias)) {
      resolve.alias = [
        {
          find: "react-dom/client",
          replacement: "react-dom",
        },
      ];
    } else {
      resolve.alias = {
        "react-dom/client": "react-dom",
      };
    }
  }

  /**
   * @type {import('vite').InlineConfig}
   */
  const config = {
    ...viteConfig,
    base: ladleConfig.base,
    configFile: false,
    publicDir:
      typeof userViteConfig.publicDir === "undefined"
        ? join(process.cwd(), "public")
        : userViteConfig.publicDir,
    cacheDir: userViteConfig.cacheDir
      ? userViteConfig.cacheDir
      : join(process.cwd(), "node_modules/.vite"),
    root: getAppRoot(),
    css: {
      postcss:
        userViteConfig.css && userViteConfig.css.postcss
          ? userViteConfig.css.postcss
          : process.cwd(),
    },
    envDir: userViteConfig.envDir ? userViteConfig.envDir : process.cwd(),
    resolve,
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        // esbuild fails to resolve react import in this package if @vitejs/react-plugin is not used
        // really strange?
        //"@ladle/react-context",
        "react-inspector",
        "classnames",
        "debug",
        "history",
        "lodash.merge",
        "query-string",
        "prism-react-renderer",
        "prism-react-renderer/themes/github",
        "prism-react-renderer/themes/nightOwl",
        "axe-core",
        "react-frame-component",
        "@mdx-js/react",
        ...(!!resolve.alias ? [] : ["react-dom/client"]),
      ],
      entries: [
        path.join(process.cwd(), ".ladle/components.js"),
        path.join(process.cwd(), ".ladle/components.jsx"),
        path.join(process.cwd(), ".ladle/components.tsx"),
        path.join(process.cwd(), ".ladle/components.ts"),
      ],
    },
    plugins: [
      mdxPlugin({ mode: viteConfig.mode || "production" }),
      !hasTSConfigPathPlugin &&
        tsconfigPaths({
          root: process.cwd(),
        }),
      ladlePlugin(ladleConfig, configFolder, viteConfig.mode || ""),
      !hasReactPlugin && !hasReactSwcPlugin && react(),
    ],
  };
  return mergeViteConfigs(userViteConfig, config);
};

export default getBaseViteConfig;
