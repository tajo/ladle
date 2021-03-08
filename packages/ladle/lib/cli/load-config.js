import path from "path";
import merge from "lodash.merge";
import debug from "./debug.js";
import defaultConfig from "../shared/default-config.js";

const loadConfig = async () => {
  try {
    /**
     * @type {import('../shared/types').UserConfig}
     */
    const config = (
      await import(path.join(process.cwd(), "./.ladle/config.mjs"))
    ).default;
    if (Object.keys(config).length === 0) {
      debug("Custom config is empty.");
    } else {
      debug(`Custom config found: ${JSON.stringify(config, null, "  ")}`);
    }
    return /** @type {import("../shared/types").Config} */ (merge(
      defaultConfig,
      config,
    ));
  } catch (e) {
    debug(`No custom config found.`);
    return /** @type {import("../shared/types").Config} */ (defaultConfig);
  }
};

export default loadConfig;
