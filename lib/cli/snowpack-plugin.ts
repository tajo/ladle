import globby from "globby";
import micromatch from "micromatch";
import { SnowpackPlugin, SnowpackConfig } from "snowpack";
import getList from "./get-list";
import { storyGlob } from "./const";
import type { PluginOptionsT } from "./types";

const Plugin = (
  _: SnowpackConfig,
  pluginOptions: PluginOptionsT
): SnowpackPlugin => {
  let listId = "";
  let listContent = "";

  const genList = async () => {
    const entries = await globby([pluginOptions.storyGlob]);
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
