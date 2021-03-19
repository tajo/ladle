import merge from "../deps/lodash.merge";
import { config as configAny, stories } from "../generated/generated-list";
import defaultConfig from "../../shared/default-config";
import type { Config } from "../../shared/types";
import debug from "./debug";

const configTyped = configAny as Config;
if (Object.keys(configTyped).length === 0) {
  debug("No custom config found.");
} else {
  debug(`Custom config found:`);
  debug(configTyped);
}
const mergedConfig: Config = merge(defaultConfig, configTyped);
if (mergedConfig.defaultStory === "") {
  mergedConfig.defaultStory = Object.keys(stories).sort()[0];
}
debug("Final config", mergedConfig);

export default mergedConfig;
