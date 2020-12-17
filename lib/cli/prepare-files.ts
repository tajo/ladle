import path from "path";
// import cpy from "cpy";
import { promises as fs } from "fs";
import getList from "./get-list";

let listCode = "";
export const updateList = async (entries: string[]) => {
  const cachePath = path.join(__dirname, "../app/src");
  console.log(cachePath);
  if (!listCode) {
    try {
      listCode = await fs.readFile(
        path.join(cachePath, "generated-list.js"),
        "utf8"
      );
    } catch (e) {}
  }
  try {
    const updatedListCode = await getList(
      entries,
      path.join(process.cwd(), "dist/app/src")
    );
    if (listCode === updatedListCode) return;
    listCode = updatedListCode;
    await fs.writeFile(path.join(cachePath, "generated-list.js"), listCode);
  } catch (e) {
    console.log(e);
  }
};
