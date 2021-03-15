#!/usr/bin/env node

import path from "path";
import snowpackDev from "./snowpack-dev.js";
import loadConfig from "./load-config.js";
import debug from "./debug.js";

/**
 * @param params {import("../shared/types").DevParams}
 */
const serve = async (params = {}) => {
  debug("Starting serve command");
  debug(`CLI theme: ${params.theme}`);
  debug(`CLI stories: ${params.stories}`);
  debug(`CLI port: ${params.port}`);
  debug(`CLI open: ${params.open}`);
  debug(`CLI output: ${params.output}`);

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
  config.serve.port = params.port ? params.port : config.serve.port;
  config.serve.open = params.open ? params.open : config.serve.open;
  config.serve.output = process.env.DEBUG
    ? /** @type {import("../shared/types").Output}*/ ("stream")
    : params.output
    ? params.output
    : config.serve.output;
  config.babelPlugins = params.babelPlugins
    ? params.babelPlugins
    : config.babelPlugins;
  config.babelPresets = params.babelPresets
    ? params.babelPresets
    : config.babelPresets;
  config.mount = params.mount ? params.mount : config.mount;

  debug(`Final config:\n${JSON.stringify(config, null, "  ")}`);
  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = config.addons.theme.defaultState;
  await snowpackDev(config, configFolder);
};

export default serve;
