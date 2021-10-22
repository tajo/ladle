const getStoryImports = require("./get-story-imports");
const getStoryList = require("./get-story-list");
const getConfigImport = require("./get-config-import");
const getComponentsImport = require("./get-components-import");
const getHmr = require("./get-hmr");

/**
 * @param entryData {import('../../../shared/types').EntryData}
 * @param configFolder {string}
 */
const getGeneratedList = (entryData, configFolder) => {
  return `
${getStoryImports(entryData)}
${getStoryList(entryData)}
${getConfigImport(configFolder)}
${getComponentsImport(configFolder)}
${getHmr()}
`;
};

module.exports = getGeneratedList;
