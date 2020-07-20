import globby from "globby";
import path from "path";
import del from "del";
import prodBundler from "./prod-bundler";
import { storyGlob } from "./const";
import { prepareCache, updateList } from "./prepare-files";

const outputDir = path.join(process.cwd(), ".fastbook/dist");

(async () => {
  await prepareCache();
  const entries = await globby([storyGlob]);
  await updateList(entries);
  await del(outputDir);
  prodBundler({
    outputDir,
  });
})();
