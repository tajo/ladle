const getStoryImports = require("./get-story-imports");
const getStoryList = require("./get-story-list");
const getConfigImport = require("./get-config-import");
const getComponentsImport = require("./get-components-import");
const getHmr = require("./get-hmr");

/**
 * @param entryData {import('../../../shared/types').EntryData}
 * @param isDev {boolean|undefined}
 */
const getGeneratedList = (entryData, isDev = false) => {
  return `
${getStoryImports(entryData, isDev)}
${getStoryList(entryData)}
${getConfigImport()}
${getComponentsImport()}
${getHmr()}
`;
};

module.exports = getGeneratedList;
