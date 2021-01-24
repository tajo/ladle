const fs = require("fs");
const path = require("path");
const globby = require("globby");
const micromatch = require("micromatch");
const { getListWithHmr } = require("./get-list.js");
const debug = require("debug")("ladle:snowpack");

/**
 * @param _ {import("snowpack").SnowpackConfig}
 * @param pluginOptions {import("../../shared/types").PluginOptions}
 * @returns {import("snowpack").SnowpackPlugin}
 */
const Plugin = (_, pluginOptions) => {
  let listId = "";
  let listContent = "";

  const genList = async () => {
    const entries = await globby([pluginOptions.storyGlob]);
    listContent = await getListWithHmr(entries, pluginOptions.appSrcDir);
  };

  return {
    name: "snowpack-plugin",
    async transform({ id, contents, isDev }) {
      if (id.includes("lib/app/src/generated-list.")) {
        debug(`transforming: ${id}`);
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
        micromatch.isMatch(
          filePath.replace(`${process.cwd()}/`, ""),
          pluginOptions.storyGlob
        )
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
