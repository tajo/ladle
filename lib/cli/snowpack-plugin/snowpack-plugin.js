const globby = require("globby");
const micromatch = require("micromatch");
const { storyGlob } = require("./const.js");
const { getListWithHmr } = require("./get-list.js");
const debug = require("debug")("ladle:snowpack");

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
        debug(`isDev: ${isDev}`);
        listId = id.replace(".js", ".tsx");
        if (listContent === "") {
          try {
            debug("Initial generation of the list");
            await genList();
          } catch (e) {
            if (isDev) {
              debug("Error when generating the list:");
              debug(e);
              return;
            }
            debug("Error when generating the list, using the default mock.");
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
        debug(`Story was changed: ${filePath}`);
        const prevListContent = listContent;
        try {
          await genList();
        } catch (e) {}
        if (prevListContent !== listContent) {
          debug("Updating the generated list.");
          this.markChanged && this.markChanged(listId);
          this.markChanged &&
            this.markChanged(listId.replace("generated-list.tsx", "app.tsx"));
        }
      }
    },
  };
};

module.exports = Plugin;
