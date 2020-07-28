#!/usr/bin/env node

import chokidar from "chokidar";
import path from "path";
import del from "del";
import devBundler from "./dev-bundler";
import { storyGlob } from "./const";
import { prepareCache, updateList } from "./prepare-files";

let entries: string[] = [];
let initialScanComplete = false;

const outputDir = path.join(process.cwd(), ".fastbook/dist");

(async () => {
  await prepareCache();
  chokidar
    .watch(storyGlob)
    .on("add", async (path) => {
      entries.push(path);
      if (!initialScanComplete) return;
      updateList(entries);
    })
    .on("change", async () => {
      setTimeout(() => updateList(entries), 200);
    })
    .on("unlink", async (path) => {
      entries = entries.filter((entry) => entry !== path);
      updateList(entries);
    })
    .on("ready", async () => {
      initialScanComplete = true;
      await updateList(entries);
      await del(outputDir);
      devBundler({
        outputDir,
      });
    });
})();
