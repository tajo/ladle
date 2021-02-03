const globby = require("globby");
const micromatch = require("micromatch");
const debug = require("debug")("ladle:snowpack");
const { getListWithHmr, getList } = require("./get-list.js");
const { storyIdToMeta } = require("./naming-utils");

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

  const genList = async () => {
    const entries = await globby([pluginOptions.storyGlob]);
    listContent = await getListWithHmr(entries);
  };

  const genJson = async () => {
    const entries = await globby([pluginOptions.storyGlob]);
    const [, stories, storiesParams] = await getList(entries);
    const result = {
      about: {
        homepage: "https://www.ladle.dev",
        github: "https://github.com/tajo/ladle",
      },
      stories: /** @type {{[key: string]: {name: string; levels: string[]; parameters: any}}} */ ({}),
    };
    stories.forEach((story) => {
      result.stories[story] = {
        ...storyIdToMeta(story),
        parameters: storiesParams[story] ? storiesParams[story].parameters : {},
      };
    });
    jsonContent = JSON.stringify(result, null, "  ");
  };

  return {
    name: "snowpack-plugin",
    async transform({ id, contents, isDev }) {
      if (id.includes("lib/app/src/meta.json")) {
        debug(`transforming: ${id}`);
        jsonId = id;
        if (jsonContent === "") {
          try {
            debug("Initial generation of the json");
            await genJson();
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
        const prevJsonContent = jsonContent;
        try {
          await genList();
          await genJson();
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
