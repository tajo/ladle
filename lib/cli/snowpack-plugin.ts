import path from "path";
import getList from "./get-list";
import { storyGlob } from "./const";
import globby from "globby";
import micromatch from "micromatch";
import { SnowpackPlugin } from "snowpack";

const Plugin = (): SnowpackPlugin => {
  let listId = "";
  let listContent = "";

  const genList = async () => {
    const entries = await globby([storyGlob]);
    listContent = await getList(
      entries,
      path.join(process.cwd(), "dist/app/src")
    );
  };

  return {
    name: "snowpack-plugin",
    async transform({ id }) {
      if (id.includes("generated-list.")) {
        listId = id.replace(".js", ".ts");
        console.log("transforming list");
        if (listContent === "") {
          await genList();
        }
        return listContent;
      }
      return;
    },
    async onChange({ filePath }) {
      console.log("onchange", filePath);
      if (
        micromatch.isMatch(filePath.replace(`${process.cwd()}/`, ""), storyGlob)
      ) {
        const prevListContent = listContent;
        await genList();
        if (prevListContent !== listContent) {
          this.markChanged && this.markChanged(listId);
        }
      }
    },
  };
};

export default Plugin;
