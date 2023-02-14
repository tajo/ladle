import path from "path";
import { pathToFileURL } from "url";
import merge from "lodash.merge";
import debug from "./debug.js";
import defaultConfig from "../shared/default-config.js";

/**
 * @param {string} configFolder
 */
const loadConfig = async (configFolder) => {
  try {
    /**
     * @type {import('../shared/types').UserConfig}
     */
    const config = (
      await import(pathToFileURL(path.join(configFolder, "config.mjs")).href)
    ).default;
    if (Object.keys(config).length === 0) {
      debug("Custom config is empty.");
    } else {
      debug(`Custom config found: ${JSON.stringify(config, null, "  ")}`);
    }
    // don't merge default width options
    if (config?.addons?.width?.options) {
      defaultConfig.addons.width.options = {};
    }
    return /** @type {import("../shared/types").Config} */ (
      merge(defaultConfig, config)
    );
  } catch (e) {
    debug(`No custom config found.`);
    return /** @type {import("../shared/types").Config} */ (defaultConfig);
  }
};

export default loadConfig;
