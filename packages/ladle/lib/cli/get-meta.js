#!/usr/bin/env node

import { getEntryData } from "./vite-plugin/parse/get-entry-data.js";
import { getMetaJson } from "./vite-plugin/generate/get-meta-json.js";
import { globby } from "globby";
import applyCLIConfig from "./apply-cli-config.js";

const getMeta = async (params = {}) => {
  const { config } = await applyCLIConfig(params);
  const entryData = await getEntryData(
    await globby(
      Array.isArray(config.stories) ? config.stories : [config.stories],
    ),
  );
  const meta = getMetaJson(entryData);
  return meta;
};

export default getMeta;
