import path from "path";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import { globby } from "globby";
import { fileURLToPath } from "url";
import tsconfigPaths from "vite-tsconfig-paths";
import getAppRoot from "./get-app-root.js";
import ladlePlugin from "./vite-plugin/vite-plugin.js";
import debug from "./debug.js";
import mergeViteConfigs from "./merge-vite-configs.js";
import getUserViteConfig from "./get-user-vite-config.js";
import mdxPlugin from "./vite-plugin/mdx-plugin.js";
import copyMswWorker from "./copy-msw-worker.js";

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

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const inladleMonorepo = fs.existsSync(
    path.join(__dirname, "../../../../e2e/addons/package.json"),
  );
  debug("Executed from the ladle monorepo: %s", inladleMonorepo);

  const resolve = {};
  if (Array.isArray(userViteConfig.resolve?.alias)) {
    resolve.alias = [
      {
        find: "msw",
        replacement: ladleConfig.addons.msw.enabled
          ? "msw"
          : path.join(__dirname, "./empty-module.js"),
      },
      {
        find: "axe-core",
        replacement: ladleConfig.addons.a11y.enabled
          ? "axe-core"
          : path.join(__dirname, "./empty-module.js"),
      },
    ];
  } else {
    resolve.alias = {
      msw: ladleConfig.addons.msw.enabled
        ? msw
        : path.join(__dirname, "./empty-module.js"),
      ["axe-core"]: ladleConfig.addons.a11y.enabled
        ? "axe-core"
        : path.join(__dirname, "./empty-module.js"),
    };
  }

  const storyEntries = (
    await globby(
      Array.isArray(ladleConfig.stories)
        ? ladleConfig.stories
        : [ladleConfig.stories],
    )
  ).map((story) => path.join(process.cwd(), story));

  /**
   * @type {import('vite').InlineConfig}
   */
  const config = {
    ...viteConfig,
    base: ladleConfig.base,
    configFile: false,
    publicDir:
      typeof userViteConfig.publicDir === "undefined"
        ? path.join(process.cwd(), "public")
        : userViteConfig.publicDir,
    cacheDir: userViteConfig.cacheDir
      ? userViteConfig.cacheDir
      : path.join(process.cwd(), "node_modules/.vite"),
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
        "react-hotkeys-hook",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-inspector",
        "classnames",
        "debug",
        "history",
        "lodash.merge",
        "query-string",
        "prism-react-renderer",
        "@mdx-js/react",
        "@ladle/react-context",
        ...(ladleConfig.addons.a11y.enabled ? ["axe-core"] : []),
        ...(ladleConfig.addons.msw.enabled ? ["msw"] : []),
        ...(inladleMonorepo ? [] : ["@ladle/react"]),
        ...(!!resolve.alias ? [] : ["react-dom/client"]),
      ],
      entries: [
        path.join(process.cwd(), ".ladle/components.js"),
        path.join(process.cwd(), ".ladle/components.jsx"),
        path.join(process.cwd(), ".ladle/components.tsx"),
        path.join(process.cwd(), ".ladle/components.ts"),
        ...storyEntries,
      ],
    },
    plugins: [
      mdxPlugin({ mode: viteConfig.mode || "production" }),
      !hasTSConfigPathPlugin &&
        !process.versions.pnp &&
        tsconfigPaths({
          root: process.cwd(),
        }),
      ladlePlugin(ladleConfig, configFolder, viteConfig.mode || ""),
      !hasReactPlugin && !hasReactSwcPlugin && react(),
    ],
  };
  // initialize msw worker
  if (ladleConfig.addons.msw.enabled) {
    copyMswWorker(config.publicDir || "");
  }
  return mergeViteConfigs(userViteConfig, config);
};

export default getBaseViteConfig;
