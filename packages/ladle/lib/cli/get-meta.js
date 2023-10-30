#!/usr/bin/env node

import { getEntryData } from "./vite-plugin/parse/get-entry-data.js";
import { getMetaJson } from "./vite-plugin/generate/get-meta-json.js";
import { globby } from "globby";
import getAppId from "./get-app-id.js";
import applyCLIConfig from "./apply-cli-config.js";
import viteProd from "./vite-prod.js";

const getMeta = async (params = {}) => {
  process.env["VITE_LADLE_APP_ID"] = getAppId();
  const { configFolder, config } = await applyCLIConfig(params);
  await viteProd(config, configFolder);
  const entryData = await getEntryData(
    await globby(
      Array.isArray(config.stories) ? config.stories : [config.stories],
    ),
  );
  const meta = getMetaJson(entryData);
  return meta;
};

export default getMeta;
