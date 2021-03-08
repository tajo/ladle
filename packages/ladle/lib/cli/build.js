#!/usr/bin/env node

import snowpackProd from "./snowpack-prod.js";
import loadConfig from "./load-config.js";
import debug from "./debug.js";

/**
 * @param params {import("../shared/types").BuildParams}
 */
const build = async (params = {}) => {
  debug("Starting build command");
  debug(`CLI theme: ${params.theme}`);
  debug(`CLI stories: ${params.stories}`);
  debug(`CLI out: ${params.out}`);
  debug(`CLI sourcemap: ${params.sourcemap}`);
  debug(`CLI baseUrl: ${params.baseUrl}`);
  debug(`CLI optimize: ${params.optimize}`);

  const config = await loadConfig();

  // CLI flags override default and custom config files
  config.addons.theme.defaultState = params.theme
    ? params.theme
    : config.addons.theme.defaultState;
  config.stories = params.stories ? params.stories : config.stories;
  config.build.out = params.out ? params.out : config.build.out;
  config.build.sourcemap = params.sourcemap
    ? params.sourcemap
    : config.build.sourcemap;
  config.build.baseUrl = params.baseUrl ? params.baseUrl : config.build.baseUrl;
  config.build.optimize = params.optimize
    ? params.optimize
    : config.build.optimize;

  debug(`Final config:\n${JSON.stringify(config, null, "  ")}`);
  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = config.addons.theme.defaultState;
  await snowpackProd(config);
  process.exit(0);
};

export default build;
