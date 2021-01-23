import * as React from "react";
import { render } from "react-dom";
import App from "./app";
import { config } from "./generated-list";
import debug from "./debug";

if (Object.keys(config).length === 0) {
  debug("No custom config found.");
} else {
  debug(`Custom config found:`);
  debug(config);
}

render(<App config={config} />, document.getElementById("root"));
