#!/usr/bin/env node

import path from "path";
import { promises as fs } from "fs";
import globby from "globby";
import viteProd from "./vite-prod.js";
import loadConfig from "./load-config.js";
import debug from "./debug.js";
import { getMetaJsonString } from "./vite-plugin/generate/get-meta-json.js";
import { getEntryData } from "./vite-plugin/parse/get-entry-data.js";

/**
 * @param params {import("../shared/types").BuildParams}
 */
const build = async (params = {}) => {
  debug("Starting build command");
  debug(`CLI theme: ${params.theme}`);
  debug(`CLI stories: ${params.stories}`);
  debug(`CLI out: ${params.build ? params.build.out : "undefined"}`);
  debug(
    `CLI sourcemap: ${params.build ? params.build.sourcemap : "undefined"}`,
  );
  debug(`CLI baseUrl: ${params.build ? params.build.baseUrl : "undefined"}`);

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
  config.build.define =
    params.build && params.build.define
      ? params.build.define
      : config.build.define;
  config.resolve.alias =
    params.resolve && params.resolve.alias
      ? params.resolve.alias
      : config.resolve.alias;
  config.optimizeDeps.include =
    params.optimizeDeps && params.optimizeDeps.include
      ? params.optimizeDeps.include
      : config.optimizeDeps.include;
  config.build.out =
    params.build && params.build.out ? params.build.out : config.build.out;
  config.build.sourcemap =
    params.build && params.build.sourcemap
      ? params.build.sourcemap
      : config.build.sourcemap;
  config.build.baseUrl =
    params.build && params.build.baseUrl
      ? params.build.baseUrl
      : config.build.baseUrl;
  config.build.minify =
    params.build && params.build.minify
      ? params.build.minify
      : config.build.minify;
  config.babelPlugins = params.babelPlugins
    ? params.babelPlugins
    : config.babelPlugins;
  config.babelPresets = params.babelPresets
    ? params.babelPresets
    : config.babelPresets;

  debug(`Final config:\n${JSON.stringify(config, null, "  ")}`);
  process.env["VITE_PUBLIC_LADLE_THEME"] = config.addons.theme.defaultState;
  await viteProd(config, configFolder);
  console.log("Creating meta.json file...");
  const entryData = await getEntryData(await globby([config.stories]));
  const jsonContent = getMetaJsonString(entryData);
  await fs.writeFile(
    path.join(process.cwd(), config.build.out, "meta.json"),
    jsonContent,
  );
  console.log("meta.json file created.");
  return true;
};

export default build;
