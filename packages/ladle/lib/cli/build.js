#!/usr/bin/env node

import path from "path";
import { promises as fs } from "fs";
import { performance } from "perf_hooks";
import { globby } from "globby";
import viteProd from "./vite-prod.js";
import debug from "./debug.js";
import { getMetaJsonString } from "./vite-plugin/generate/get-meta-json.js";
import { getEntryData } from "./vite-plugin/parse/get-entry-data.js";
import getFolderSize from "./get-folder-size.js";
import applyCLIConfig from "./apply-cli-config.js";
import getAppId from "./get-app-id.js";

/**
 * @param params {import("../shared/types").CLIParams}
 */
const build = async (params = {}) => {
  const startTime = performance.now();
  debug("Starting build command");
  process.env["VITE_LADLE_APP_ID"] = getAppId();
  const { configFolder, config } = await applyCLIConfig(params);
  await viteProd(config, configFolder);
  const entryData = await getEntryData(
    await globby(
      Array.isArray(config.stories) ? config.stories : [config.stories],
    ),
  );
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
  console.log(config.i18n.buildTooltip);
  return true;
};

export default build;
