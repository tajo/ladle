#!/usr/bin/env node

import path from "path";
import { promises as fs } from "fs";
import globby from "globby";
import viteProd from "./vite-prod.js";
import loadConfig from "./load-config.js";
import debug from "./debug.js";
import { getMetaJsonString } from "./vite-plugin/generate/get-meta-json.js";
import { getEntryData } from "./vite-plugin/parse/get-entry-data.js";
import getFolderSize from "./get-folder-size.js";

/**
 * @param params {import("../shared/types").BuildParams}
 */
const build = async (params = {}) => {
  const startTime = performance.now();
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
  const entryData = await getEntryData(await globby([config.stories]));
  const jsonContent = getMetaJsonString(entryData);
  await fs.writeFile(
    path.join(process.cwd(), config.outDir, "meta.json"),
    jsonContent,
  );
  console.log("✓  Meta.json successfully created.");
  const folderSize = await getFolderSize(
    path.join(process.cwd(), config.outDir),
  );
  const stopTime = performance.now();
  const inSeconds = (stopTime - startTime) / 1000;
  console.log(
    `⏱️  Ladle finished the production build in ${Number(inSeconds).toFixed(
      0,
    )}s producing ${folderSize} MiB of assets.`,
  );
  console.log('💡 Tip: Run "ladle preview" to check that the build works!');
  return true;
};

export default build;
