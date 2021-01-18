import * as React from "react";
import { render } from "react-dom";
import App from "./app";
import { config } from "./generated-list";

(async () => {
  console.log(config);
  render(<App />, document.getElementById("root"));
})();
