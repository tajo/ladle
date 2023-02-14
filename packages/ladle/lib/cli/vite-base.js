import { join } from "path";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import ladlePlugin from "./vite-plugin/vite-plugin.js";
import mergeViteConfigs from "./merge-vite-configs.js";
import getUserViteConfig from "./get-user-vite-config.js";
import mdxPlugin from "./vite-plugin/mdx-plugin.js";
import { getFrameworkConfig } from "./framework.js";

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

  const frameworkConfig = getFrameworkConfig();

  const { userViteConfig, hasTSConfigPathPlugin } = await getUserViteConfig(
    viteConfig.build ? "build" : "serve",
    viteConfig.mode || "production",
    ladleConfig.viteConfig,
  );

  /**
   * @type {import('vite').InlineConfig}
   */
  const config = {
    ...viteConfig,
    base: ladleConfig.base,
    configFile: false,
    define: {
      "process.env": {
        NODE_ENV: JSON.stringify(viteConfig.mode || "production"),
      },
    },
    publicDir:
      typeof userViteConfig.publicDir === "undefined"
        ? join(process.cwd(), "public")
        : userViteConfig.publicDir,
    cacheDir: userViteConfig.cacheDir
      ? userViteConfig.cacheDir
      : join(process.cwd(), "node_modules/.vite"),
    root: frameworkConfig.vite.app,
    css: {
      postcss:
        userViteConfig.css && userViteConfig.css.postcss
          ? userViteConfig.css.postcss
          : process.cwd(),
    },
    envDir: userViteConfig.envDir ? userViteConfig.envDir : process.cwd(),
    optimizeDeps: {
      include: [
        "classnames",
        "debug",
        "lodash.merge",
        "query-string",
        "axe-core",
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
    ],
  };
  /**
   * @type {undefined | import('vite').InlineConfig}
   */
  const frameworkDefaultConfig = await frameworkConfig.vite?.config?.(
    userViteConfig,
    config,
  );
  return mergeViteConfigs(userViteConfig, frameworkDefaultConfig || config);
};

export default getBaseViteConfig;
