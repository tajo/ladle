import globby from "globby";
import debugFactory from "debug";
import getGeneratedList from "./generate/get-generated-list.js";
import { getEntryData } from "./parse/get-entry-data.js";

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
