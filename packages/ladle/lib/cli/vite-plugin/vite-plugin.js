import globby from "globby";
import path from "path";
import { fileURLToPath } from "url";
import debugFactory from "debug";
import getGeneratedList from "./generate/get-generated-list.js";
import { getEntryData } from "./parse/get-entry-data.js";
import { detectDuplicateStoryNames, printError } from "./utils.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const debug = debugFactory("ladle:vite");

/**
 * @param errorMessage {string}
 */
const defaultListModule = (errorMessage) => `
import { lazy } from "react";
import * as React from "react";
export const Foo = lazy(() => Promise.resolve() as any);
export const list = ["Foo"];
export const config = {};
export const stories = {};

export const storySource = {};
export const errorMessage = \`${errorMessage}\`;

export const Provider = ({ children }: { children: any }) =>
  /*#__PURE__*/ React.createElement(React.Fragment, null, children);
`;

/**
 * @param config {import("../../shared/types").Config}
 * @param configFolder {string}
 * @param mode {string}
 */
function ladlePlugin(config, configFolder, mode) {
  const virtualFileId = "lib/app/generated/generated-list";
  return {
    name: "generated-list", // required, will show up in warnings and errors
    /**
     * @param {string} id
     */
    resolveId(id) {
      if (id.includes(virtualFileId)) {
        return virtualFileId;
      }
      return null;
    },
    /**
     * @param {string} code
     * @param {string} id
     */
    async transform(code, id) {
      // We instrument stories with a simple eventemitter like code so
      // some addons (like a11y) can subscribe to changes and re-run
      // on HMR updates
      if (id.includes(".stories.")) {
        const from = path
          .relative(id, path.join(__dirname, "../../app/src"))
          .slice(3);
        const watcherImport = `import { storyUpdated } from "${from}/story-hmr";`;
        return `${code}\n${watcherImport}\nif (import.meta.hot) {
          import.meta.hot.accept(() => {
            storyUpdated();
          });
        }`;
      }
      return code;
    },
    /**
     * @param {string} id
     */
    async load(id) {
      if (id.includes(virtualFileId)) {
        debug(`transforming: ${id}`);
        try {
          debug("Initial generation of the list");
          const entryData = await getEntryData(await globby([config.stories]));
          detectDuplicateStoryNames(entryData);
          return getGeneratedList(entryData, configFolder, config);
        } catch (/** @type {any} */ e) {
          printError("Error when generating the story list:");
          console.log("");
          printError(e);
          if (mode === "production") {
            process.exit(1);
          }
          return /** @type {string} */ (defaultListModule(e.message));
        }
      }
      return;
    },
  };
}

export default ladlePlugin;
