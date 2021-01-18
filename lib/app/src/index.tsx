import * as React from "react";
import { render } from "react-dom";
import App from "./app";

(async () => {
  let config: any = {};
  //@ts-ignore
  if (import.meta.env.SNOWPACK_PUBLIC_CONFIG_EXISTS === "true") {
    console.log("trying to load config");
    try {
      //@ts-ignore
      config = await import("../../../.ladle/config.mjs");
      console.log(config.default);
    } catch (e) {
      console.log(e);
      console.log("No config");
    }
  } else {
    console.log("No config");
  }

  render(<App />, document.getElementById("root"));
})();
