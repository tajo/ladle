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
    async transform({ id, contents, isDev }) {
      if (id.includes("generated-list.")) {
        listId = id.replace(".js", ".tsx");
        if (listContent === "") {
          try {
            await genList();
          } catch (e) {
            if (isDev) {
              return;
            }
            return /** @type {string} */ (contents);
          }
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
        try {
          await genList();
        } catch (e) {}
        if (prevListContent !== listContent) {
          this.markChanged && this.markChanged(listId);
          this.markChanged &&
            this.markChanged(listId.replace("generated-list.tsx", "app.tsx"));
        }
      }
    },
  };
};

module.exports = Plugin;
