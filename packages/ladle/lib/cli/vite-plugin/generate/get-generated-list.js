import getStoryImports from "./get-story-imports.js";
import getStoryList from "./get-story-list.js";
import getConfigImport from "./get-config-import.js";
import getComponentsImport from "./get-components-import.js";
import getHmr from "./get-hmr.js";

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

export default getGeneratedList;
