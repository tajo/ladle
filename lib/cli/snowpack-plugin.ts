import globby from "globby";
import micromatch from "micromatch";
import { SnowpackPlugin } from "snowpack";
import getList from "./get-list";
import { storyGlob } from "./const";

const Plugin = (): SnowpackPlugin => {
  let listId = "";
  let listContent = "";

  const genList = async () => {
    const entries = await globby([storyGlob]);
    listContent = await getList(entries);
  };

  return {
    name: "snowpack-plugin",
    async transform({ id }) {
      if (id.includes("generated-list.")) {
        listId = id.replace(".js", ".ts");
        if (listContent === "") {
          await genList();
        }
        return listContent;
      }
      return;
    },
    async onChange({ filePath }) {
      if (
        micromatch.isMatch(filePath.replace(`${process.cwd()}/`, ""), storyGlob)
      ) {
        const prevListContent = listContent;
        await genList();
        if (prevListContent !== listContent) {
          this.markChanged && this.markChanged(listId);
          this.markChanged &&
            this.markChanged(listId.replace("generated-list.ts", "app.tsx"));
        }
      }
    },
  };
};

export default Plugin;
