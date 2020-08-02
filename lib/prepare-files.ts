import path from "path";
import cpy from "cpy";
import makeDir from "make-dir";
import { promises as fs } from "fs";
import getList from "./get-list";

let listCode = "";
export const updateList = async (entries: string[], cacheDir: string) => {
  const cachePath = path.join(cacheDir, "app");
  if (!listCode) {
    try {
      listCode = await fs.readFile(
        path.join(cachePath, "generated-list.js"),
        "utf8"
      );
    } catch (e) {}
  }
  try {
    const updatedListCode = await getList(entries);
    if (listCode === updatedListCode) return;
    listCode = updatedListCode;
    await fs.writeFile(path.join(cachePath, "generated-list.js"), listCode);
  } catch (e) {
    console.log(e);
  }
};

export const prepareCache = async (cacheDir: string) => {
  const cachePath = path.join(cacheDir, "app");
  await makeDir(cachePath);
  await cpy([`${__dirname}/app/**/*.{html,tsx,ts,js,jsx,css}`], cachePath, {
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
};
