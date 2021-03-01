const getStoryImports = require("./get-story-imports");
const getStoryList = require("./get-story-list");
const getConfigImport = require("./get-config-import");
const getComponentsImport = require("./get-components-import");
const getHmr = require("./get-hmr");

/**
 * @param entryData {import('../../../shared/types').EntryData}
 */
const getGeneratedList = (entryData) => {
  return `
${getStoryImports(entryData)}
${getStoryList(entryData)}
${getConfigImport()}
${getComponentsImport()}
${getHmr()}
`;
};

module.exports = getGeneratedList;
