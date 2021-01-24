import * as React from "react";
import { render } from "react-dom";
import merge from "lodash.merge";
import App from "./app";
import { config as configAny } from "./generated-list";
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
debug(`Final config:`);
debug(mergedConfig);

render(<App config={mergedConfig} />, document.getElementById("root"));
