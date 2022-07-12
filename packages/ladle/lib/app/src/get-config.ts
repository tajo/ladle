import merge from "lodash.merge";
import { config, stories } from "virtual:generated-list";
import defaultConfig from "../../shared/default-config";
import type { Config } from "../../shared/types";
import debug from "./debug";

if (Object.keys(config).length === 0) {
  debug("No custom config found.");
} else {
  debug(`Custom config found:`);
  debug(config);
}

// don't merge default width options
if (config?.addons?.width?.options) {
  defaultConfig.addons.width.options = {};
}
const mergedConfig: Config = merge(defaultConfig, config);
if (mergedConfig.defaultStory === "") {
  mergedConfig.defaultStory = Object.keys(stories).sort()[0];
}
debug("Final config", mergedConfig);

export default mergedConfig;
