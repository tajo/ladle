import { isAbsolute, join } from "path";
import { loadConfigFromFile } from "vite";
import debug from "./debug.js";

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
  /** @type {undefined | import('vite').UserConfig} */
  const userViteConfig = await loadConfigFromFile(
    { command, mode },
    viteConfig,
  ).then((loaded) => loaded?.config);
  if (!userViteConfig) {
    return {
      userViteConfig: {},
      hasTSConfigPathPlugin: false,
    };
  }

  debug(`user vite config loaded:`);
  debug(userViteConfig);

  if (userViteConfig.publicDir) {
    userViteConfig.publicDir = getPublicDir(userViteConfig.publicDir);
  }
  if (userViteConfig.cacheDir) {
    userViteConfig.cacheDir = getCacheDir(userViteConfig.cacheDir);
  }

  const hasTSConfigPathPlugin = userViteConfig.plugins
    ? userViteConfig.plugins.some(
        //@ts-ignore
        (plugin) => plugin && plugin.name === "vite:tsconfig-paths",
      )
    : false;

  return { userViteConfig, hasTSConfigPathPlugin };
};
