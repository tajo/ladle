#!/usr/bin/env node

import chokidar from "chokidar";
import path from "path";
import del from "del";
import devBundler from "./dev-bundler";
import { updateList } from "./prepare-files";
import type { ServeParamsT } from "./types";

let entries: string[] = [];
let initialScanComplete = false;

const serve = async (params: ServeParamsT) => {
  chokidar
    .watch(params.stories)
    .on("add", async (path) => {
      entries.push(path);
      if (!initialScanComplete) return;
      updateList(entries);
    })
    .on("change", async () => {
      updateList(entries);
    })
    .on("unlink", async (path) => {
      entries = entries.filter((entry) => entry !== path);
      updateList(entries);
    })
    .on("ready", async () => {
      initialScanComplete = true;
      await updateList(entries);
      devBundler(/*params*/);
    });
};

export default serve;
