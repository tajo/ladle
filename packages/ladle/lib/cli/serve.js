#!/usr/bin/env node

import path from "path";
import viteDev from "./vite-dev.js";
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
  config.enableFlow = params.enableFlow ? params.enableFlow : config.enableFlow;
  config.publicDir = params.publicDir ? params.publicDir : config.publicDir;
  config.vitePlugins = params.vitePlugins
    ? params.vitePlugins
    : config.vitePlugins;
  config.envPrefix = params.envPrefix ? params.envPrefix : config.envPrefix;
  config.defaultStory = params.defaultStory
    ? params.defaultStory
    : config.defaultStory;
  config.define = params.define ? params.define : config.define;
  config.css.modules =
    params.css && params.css.modules ? params.css.modules : config.css.modules;
  config.serve.port =
    params.serve && params.serve.port ? params.serve.port : config.serve.port;
  config.serve.open =
    params.serve && params.serve.open ? params.serve.open : config.serve.open;
  config.serve.define =
    params.serve && params.serve.define
      ? params.serve.define
      : config.serve.define;
  config.resolve.alias =
    params.resolve && params.resolve.alias
      ? params.resolve.alias
      : config.resolve.alias;
  config.optimizeDeps.include =
    params.optimizeDeps && params.optimizeDeps.include
      ? params.optimizeDeps.include
      : config.optimizeDeps.include;
  config.babelPlugins = params.babelPlugins
    ? params.babelPlugins
    : config.babelPlugins;
  config.babelPresets = params.babelPresets
    ? params.babelPresets
    : config.babelPresets;

  debug(`Final config:\n${JSON.stringify(config, null, "  ")}`);
  process.env["VITE_PUBLIC_LADLE_THEME"] = config.addons.theme.defaultState;
  await viteDev(config, configFolder);
};

export default serve;
