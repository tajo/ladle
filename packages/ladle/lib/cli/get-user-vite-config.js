import { isAbsolute, join } from "path";
import debug from "./debug.js";
import loadUserViteConfig from "./load-user-vite-config.cjs";

// vite.config.js paths are relative to the project root
// but for ladle, the root is in a different package, so
// we just magically fix it for the user
// users can should use absolute paths in the config to be safe

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
 * @param cacheDir {string | undefined}
 */
const getCacheDir = (cacheDir) => {
  if (!cacheDir) {
    return join(process.cwd(), "node_modules/.vite");
  }
  if (isAbsolute(cacheDir)) {
    return cacheDir;
  }
  return join(process.cwd(), cacheDir);
};

/**
 * @param command {'build' | 'serve'}
 * @param mode {string}
 * @param viteConfig {string | undefined}
 * @return {Promise<import('../shared/types').GetUserViteConfig>}
 */
export default async (command, mode, viteConfig) => {
  /**
   * @type {import('vite').UserConfigExport}
   */
  //@ts-ignore
  let rawUserViteConfig = loadUserViteConfig(viteConfig).default;

  if (!rawUserViteConfig) {
    return {
      userViteConfig: {},
      hasReactPlugin: false,
      hasTSConfigPathPlugin: false,
    };
  }
  /** @type {import('vite').UserConfig} */
  let userViteConfig;
  if (typeof rawUserViteConfig === "function") {
    userViteConfig = await rawUserViteConfig({ command, mode });
  } else {
    userViteConfig = /** @type {import('vite').UserConfig} */ (
      rawUserViteConfig
    );
  }

  debug(`user vite config loaded:`);
  debug(userViteConfig);

  if (userViteConfig.publicDir) {
    userViteConfig.publicDir = getPublicDir(userViteConfig.publicDir);
  }
  if (userViteConfig.cacheDir) {
    userViteConfig.cacheDir = getCacheDir(userViteConfig.cacheDir);
  }

  // detect if user's config has react and TS Config plugins
  // so we can't avoid adding them through our defaults again
  const hasReactPlugin = userViteConfig.plugins
    ? userViteConfig.plugins.some((plugin) => {
        return Array.isArray(plugin)
          ? plugin.some(
              //@ts-ignore
              (item) => item && item.name && item.name.includes("vite:react-"),
            )
          : //@ts-ignore
            plugin && plugin.name && plugin.name.includes("vite:react-");
      })
    : false;
  const hasTSConfigPathPlugin = userViteConfig.plugins
    ? userViteConfig.plugins.some(
        //@ts-ignore
        (plugin) => plugin && plugin.name === "vite:tsconfig-paths",
      )
    : false;

  return { userViteConfig, hasReactPlugin, hasTSConfigPathPlugin };
};
