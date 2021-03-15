#!/usr/bin/env node

import path from "path";
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

  params.config = params.config || ".ladle";
  const configFolder = path.isAbsolute(params.config)
    ? params.config
    : path.join(process.cwd(), params.config);
  const config = await loadConfig(configFolder);

  // CLI flags override default and custom config files
  config.addons.theme.defaultState = params.theme
    ? params.theme
    : config.addons.theme.defaultState;
  config.stories = params.stories ? params.stories : config.stories;
  config.root = params.root ? params.root : config.root;
  config.packageOptions.external =
    params.packageOptions && params.packageOptions.external
      ? params.packageOptions.external
      : config.packageOptions.external;
  config.packageOptions.knownEntrypoints =
    params.packageOptions && params.packageOptions.knownEntrypoints
      ? params.packageOptions.knownEntrypoints
      : config.packageOptions.knownEntrypoints;
  config.packageOptions.polyfillNode =
    params.packageOptions && params.packageOptions.polyfillNode
      ? params.packageOptions.polyfillNode
      : config.packageOptions.polyfillNode;
  config.build.out = params.out ? params.out : config.build.out;
  config.build.sourcemap = params.sourcemap
    ? params.sourcemap
    : config.build.sourcemap;
  config.build.baseUrl = params.baseUrl ? params.baseUrl : config.build.baseUrl;
  config.build.optimize = params.optimize
    ? params.optimize
    : config.build.optimize;
  config.babelPlugins = params.babelPlugins
    ? params.babelPlugins
    : config.babelPlugins;
  config.babelPresets = params.babelPresets
    ? params.babelPresets
    : config.babelPresets;
  config.mount = params.mount ? params.mount : config.mount;

  debug(`Final config:\n${JSON.stringify(config, null, "  ")}`);
  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = config.addons.theme.defaultState;
  await snowpackProd(config, configFolder);
  process.exit(0);
};

export default build;
