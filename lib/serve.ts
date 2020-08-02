#!/usr/bin/env node

import chokidar from "chokidar";
import path from "path";
import del from "del";
import devBundler from "./dev-bundler";
import { prepareCache, updateList } from "./prepare-files";
import type { ServeParamsT } from "./types";

let entries: string[] = [];
let initialScanComplete = false;

const serve = async (params: ServeParamsT) => {
  await prepareCache(params.cacheDir);
  chokidar
    .watch(params.stories)
    .on("add", async (path) => {
      entries.push(path);
      if (!initialScanComplete) return;
      updateList(entries, params.cacheDir);
    })
    .on("change", async () => {
      setTimeout(() => updateList(entries, params.cacheDir), 200);
    })
    .on("unlink", async (path) => {
      entries = entries.filter((entry) => entry !== path);
      updateList(entries, params.cacheDir);
    })
    .on("ready", async () => {
      const outputDir = path.join(params.cacheDir, "dist");
      initialScanComplete = true;
      await updateList(entries, params.cacheDir);
      await del(outputDir);
      devBundler(params);
    });
};

export default serve;
