const globby = require("globby");
const micromatch = require("micromatch");
const debug = require("debug")("ladle:snowpack");
const getMetaJson = require("./generate/get-meta-json.js");
const getGeneratedList = require("./generate/get-generated-list.js");
const { getEntryData, getSingleEntry } = require("./parse/get-entry-data.js");

/**
 * @description main cached metadata for each parsed file
 * @type {import('../../shared/types').EntryData}
 */
let entryData = {};

/**
 * @param _ {import("snowpack").SnowpackConfig}
 * @param pluginOptions {import("../../shared/types").PluginOptions}
 * @returns {import("snowpack").SnowpackPlugin}
 */
const Plugin = (_, pluginOptions) => {
  let listId = "";
  let listContent = "";
  let jsonId = "";
  let jsonContent = "";

  return {
    name: "snowpack-plugin",
    async transform({ id, contents, isDev }) {
      if (id.includes("lib/app/src/meta.json")) {
        debug(`transforming: ${id}`);
        jsonId = id;
        if (jsonContent === "") {
          try {
            debug("Initial generation of the json");
            entryData =
              Object.keys(entryData).length > 0
                ? entryData
                : await getEntryData(await globby([pluginOptions.storyGlob]));
            jsonContent = getMetaJson(entryData);
          } catch (e) {
            if (isDev) {
              debug("Error when generating the json:");
              debug(e);
              return;
            }
            debug("Error when generating the json, using the default mock.");
            return /** @type {string} */ (contents);
          }
        }
        return jsonContent;
      }
      if (id.includes("lib/app/generated/generated-list.")) {
        debug(`transforming: ${id}`);
        debug(`isDev: ${isDev}`);
        listId = id.replace(".js", ".tsx");
        if (listContent === "") {
          try {
            debug("Initial generation of the list");
            entryData =
              Object.keys(entryData).length > 0
                ? entryData
                : await getEntryData(await globby([pluginOptions.storyGlob]));
            listContent = getGeneratedList(entryData, isDev);
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
      const entry = filePath.replace(`${process.cwd()}/`, "");
      if (micromatch.isMatch(entry, pluginOptions.storyGlob)) {
        debug(`Story was changed: ${entry}`);
        const prevListContent = listContent;
        const prevJsonContent = jsonContent;
        try {
          entryData[entry] = await getSingleEntry(entry);
          listContent = getGeneratedList(entryData, true);
          jsonContent = getMetaJson(entryData);
        } catch (e) {}
        if (prevListContent !== listContent) {
          debug("Updating the generated list.");
          this.markChanged && this.markChanged(listId);
          this.markChanged &&
            this.markChanged(listId.replace("generated-list.tsx", "app.tsx"));
        }
        if (prevJsonContent !== jsonContent) {
          debug("Updating the generated json.");
          this.markChanged && this.markChanged(jsonId);
        }
      }
    },
  };
};

module.exports = Plugin;
