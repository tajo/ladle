const chokidar = require("chokidar");
const path = require("path");
const fs = require("fs").promises;
const bundler = require("./bundler");
const getList = require("./get-list");
const { appPath, cachePath, storyGlob } = require("./const");

let listCode = "";
let entries = [];
let initialScanComplete = false;

const updateList = async (entries) => {
  if (!listCode) {
    listCode = fs.readFile(path.join(cachePath, "list.js"), "utf8");
  }
  try {
    const updatedListCode = await getList(entries);
    if (listCode === updatedListCode) return;
    listCode = updatedListCode;
    await fs.writeFile(path.join(cachePath, "list.js"), listCode);
  } catch (e) {}
};

chokidar
  .watch(storyGlob)
  .on("add", async (path) => {
    entries.push(path);
    if (!initialScanComplete) return;
    updateList(entries);
  })
  .on("change", async (path) => {
    setTimeout(() => updateList(entries), 200);
  })
  .on("unlink", async (path) => {
    entries = entries.filter((entry) => entry !== path);
    updateList(entries);
  })
  .on("ready", async () => {
    initialScanComplete = true;
    await updateList(entries);
    bundler({
      outputDir: path.join(process.cwd(), "dist"),
    });
  });
