const globby = require("globby");
const micromatch = require("micromatch");
const { storyGlob } = require("./const.js");
const { getListWithHmr } = require("./get-list.js");

/**
 * @param _ {import("snowpack").SnowpackConfig}
 * @param pluginOptions {import("../types").PluginOptionsT}
 * @returns {import("snowpack").SnowpackPlugin}
 */
const Plugin = (_, pluginOptions) => {
  let listId = "";
  let listContent = "";

  const genList = async () => {
    const entries = await globby([pluginOptions.storyGlob]);
    listContent = await getListWithHmr(entries);
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

module.exports = Plugin;
