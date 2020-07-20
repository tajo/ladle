import chokidar from "chokidar";
import path from "path";
import cpy from "cpy";
import makeDir from "make-dir";
import { promises as fs } from "fs";
import devBundler from "./dev-bundler";
import getList from "./get-list";
import { cachePath, storyGlob } from "./const";

let listCode = "";
let entries: string[] = [];
let initialScanComplete = false;

const updateList = async (entries: string[]) => {
  if (!listCode) {
    try {
      listCode = await fs.readFile(path.join(cachePath, "list.js"), "utf8");
    } catch (e) {}
  }
  try {
    const updatedListCode = await getList(entries);
    if (listCode === updatedListCode) return;
    listCode = updatedListCode;
    await fs.writeFile(path.join(cachePath, "list.js"), listCode);
  } catch (e) {
    console.log(e);
  }
};

(async () => {
  await makeDir(cachePath);
  await cpy([`${__dirname}/app/**/*.{html,tsx,ts,js,jsx}`], cachePath, {
    // don't copy files that are same, prevents cache busting
    filter: async (file) => {
      try {
        const toCode = await fs.readFile(
          file.path.replace(`${__dirname}/app`, cachePath),
          "utf8"
        );
        const fromCode = await fs.readFile(file.path, "utf8");
        if (toCode !== fromCode) return true;
      } catch (e) {
        return true;
      }
      return false;
    },
  });
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
      devBundler({
        outputDir: path.join(process.cwd(), "dist-fastbook"),
      });
    });
})();
