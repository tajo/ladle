const globby = require("globby");
const micromatch = require("micromatch");
const debug = require("debug")("ladle:vite");
const getMetaJson = require("./generate/get-meta-json.js");
const getGeneratedList = require("./generate/get-generated-list.js");
const { getEntryData, getSingleEntry } = require("./parse/get-entry-data.js");

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
 * @param config {import("../shared/types").Config}
 */
function ladlePlugin(config) {
  const virtualFileId = "lib/app/generated/generated-list";
  return {
    name: "generated-list", // required, will show up in warnings and errors
    resolveId(id) {
      if (id.includes(virtualFileId)) {
        return virtualFileId;
      }
    },
    async load(id) {
      if (id.includes(virtualFileId)) {
        debug(`transforming: ${id}`);
        try {
          debug("Initial generation of the list");
          const entryData = await getEntryData(await globby([config.stories]));
          return getGeneratedList(entryData, process.cwd());
        } catch (e) {
          if (isDev) {
            debug("Error when generating the list:");
            debug(e);
            return;
          }
        }
        debug("Error when generating the list, using the default mock.");
        return /** @type {string} */ (defaultListModule);
      }
    },
  };
}

module.exports = ladlePlugin;
