#!/usr/bin/env node

import snowpackDev from "./snowpack-dev.js";
import loadConfig from "./load-config.js";

/**
 * @param params {import("./types").DevParamsT}
 */
const serve = async (params) => {
  const config = await loadConfig();

  // CLI flags override default and custom config files
  config.theme = params.theme ? params.theme : config.theme;
  config.stories = params.stories ? params.stories : config.stories;
  config.serve.port = params.port ? params.port : config.serve.port;
  config.serve.open = params.open ? params.open : config.serve.open;
  config.serve.output = params.output ? params.output : config.serve.output;

  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = config.theme;
  await snowpackDev(config);
};

export default serve;
