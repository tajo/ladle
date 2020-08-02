#!/usr/bin/env node

import globby from "globby";
import path from "path";
import del from "del";
import prodBundler from "./prod-bundler";
import { storyGlob } from "./const";
import { prepareCache, updateList } from "./prepare-files";
import type { BuildParamsT } from "./types";

const build = async (params: BuildParamsT) => {
  await prepareCache(params.cacheDir);
  const entries = await globby([storyGlob]);
  await updateList(entries, params.cacheDir);
  await del(path.join(params.cacheDir, "dist"));
  prodBundler(params);
};

export default build;
