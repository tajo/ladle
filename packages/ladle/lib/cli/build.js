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
  debug(`CLI out: ${params.outDir ? params.outDir : "undefined"}`);
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
  config.viteConfig = params.viteConfig ? params.viteConfig : config.viteConfig;
  config.outDir = params.outDir ? params.outDir : config.outDir;
  debug(`Final config:\n${JSON.stringify(config, null, "  ")}`);
  process.env["VITE_PUBLIC_LADLE_THEME"] = config.addons.theme.defaultState;
  await viteProd(config, configFolder);
  console.log("Creating meta.json file...");
  const entryData = await getEntryData(await globby([config.stories]));
  const jsonContent = getMetaJsonString(entryData);
  await fs.writeFile(
    path.join(process.cwd(), config.outDir, "meta.json"),
    jsonContent,
  );
  console.log("meta.json file created.");
  return true;
};

export default build;
