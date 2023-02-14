import debug from "./debug.js";

/**
 * framework config
 *
 * @type {null | import('../shared/types').LadleFrameworkConfig}
 */
let framework = null;

/**
 * define framework config as a singleton to be used in other modules
 * could be improved by using dependency injection pattern
 *
 * @param {import('../shared/types').LadleFrameworkConfig} config
 * @param config
 */
export const defineFrameworkConfig = (config) => {
  framework = config;
};

export const getFrameworkConfig = () => {
  if (framework) {
    return framework;
  }

  // exit node process early if framework is not set
  debug("framework config not set");
  process.exit(1);
};

export const startCli = () => import("./cli.js"); // run cli immediately after framework config is defined

export { generate, template } from "./vite-plugin/babel.js";
export { default as cleanupWindowsPath } from "./vite-plugin/generate/cleanup-windows-path.js";
export { IMPORT_ROOT } from "./vite-plugin/utils.js";
