#!/usr/bin/env node

import globby from "globby";
import path from "path";
import del from "del";
import prodBundler from "./prod-bundler";
import { updateList } from "./prepare-files";
import type { BuildParamsT } from "./types";

const build = async (params: BuildParamsT) => {
  const entries = await globby([params.stories]);
  await updateList(entries, params.cacheDir);
  await del(path.join(params.cacheDir, "dist"));
  prodBundler(params);
};

export default build;
