#!/usr/bin/env node

import snowpackDev from "./snowpack-dev.js";
import loadConfig from "./load-config.js";
import debug from "./debug.js";

/**
 * @param params {import("./types").DevParamsT}
 */
const serve = async (params) => {
  debug("Starting serve command");
  debug(`CLI theme: ${params.theme}`);
  debug(`CLI stories: ${params.stories}`);
  debug(`CLI port: ${params.port}`);
  debug(`CLI open: ${params.open}`);
  debug(`CLI output: ${params.output}`);

  const config = await loadConfig();

  // CLI flags override default and custom config files
  config.theme = params.theme ? params.theme : config.theme;
  config.stories = params.stories ? params.stories : config.stories;
  config.serve.port = params.port ? params.port : config.serve.port;
  config.serve.open = params.open ? params.open : config.serve.open;
  config.serve.output = process.env.DEBUG
    ? "stream"
    : params.output
    ? params.output
    : config.serve.output;

  debug(`Final theme: ${config.theme}`);
  debug(`Final stories: ${config.stories}`);
  debug(`Final serve.port: ${config.serve.port}`);
  debug(`Final serve.open: ${config.serve.open}`);
  debug(`Final serve.output: ${config.serve.output}`);

  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = config.theme;
  await snowpackDev(config);
};

export default serve;
