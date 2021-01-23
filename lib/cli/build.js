#!/usr/bin/env node

import snowpackProd from "./snowpack-prod.js";
import loadConfig from "./load-config.js";
import debug from "./debug.js";

/**
 * @param params {import("./types").BuildParamsT}
 */
const build = async (params) => {
  debug("Starting build command");
  debug(`CLI theme: ${params.theme}`);
  debug(`CLI stories: ${params.stories}`);
  debug(`CLI out: ${params.out}`);
  debug(`CLI sourcemap: ${params.sourcemap}`);
  debug(`CLI baseUrl: ${params.baseUrl}`);
  debug(`CLI optimize: ${params.optimize}`);

  const config = await loadConfig();

  // CLI flags override default and custom config files
  config.theme = params.theme ? params.theme : config.theme;
  config.stories = params.stories ? params.stories : config.stories;
  config.build.out = params.out ? params.out : config.build.out;
  config.build.sourcemap = params.sourcemap
    ? params.sourcemap
    : config.build.sourcemap;
  config.build.baseUrl = params.baseUrl ? params.baseUrl : config.build.baseUrl;
  config.build.optimize = params.optimize
    ? params.optimize
    : config.build.optimize;

  debug(`Final theme: ${config.theme}`);
  debug(`Final stories: ${config.stories}`);
  debug(`Final build.out: ${config.build.out}`);
  debug(`Final build.sourcemap: ${config.build.sourcemap}`);
  debug(`Final build.baseUrl: ${config.build.baseUrl}`);
  debug(`Final build.optimize: ${config.build.optimize}`);

  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = config.theme;
  await snowpackProd(config);
  process.exit(0);
};

export default build;
