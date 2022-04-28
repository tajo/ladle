import globby from "globby";
import path from "path";
import { fileURLToPath } from "url";
import debugFactory from "debug";
import getGeneratedList from "./generate/get-generated-list.js";
import { getEntryData } from "./parse/get-entry-data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const debug = debugFactory("ladle:vite");

const defaultListModule = `
import { lazy } from "react";
import * as React from "react";
export const Foo = lazy(() => Promise.resolve() as any);
export const list = ["Foo"];
export const config = {};
export const stories = {};

export const Provider = ({ children }: { children: any }) =>
  /*#__PURE__*/ React.createElement(React.Fragment, null, children);
`;

/**
 * @param config {import("../../shared/types").Config}
 * @param configFolder {string}
 */
function ladlePlugin(config, configFolder) {
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
          return getGeneratedList(entryData, configFolder, config);
        } catch (e) {
          debug("Error when generating the list:");
          debug(e);
          return /** @type {string} */ (defaultListModule);
        }
        debug("Error when generating the list, using the default mock.");
        return /** @type {string} */ (defaultListModule);
      }
      return;
    },
  };
}

export default ladlePlugin;
