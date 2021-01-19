import * as React from "react";
import { render } from "react-dom";
import App from "./app";
import { config } from "./generated-list";

render(<App config={config} />, document.getElementById("root"));
