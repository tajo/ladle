import getStoryImports from "./get-story-imports.js";
import getStoryList from "./get-story-list.js";
import getStorySource from "./get-story-source.js";
import getConfigImport from "./get-config-import.js";
import getComponentsImport from "./get-components-import.js";

/**
 * @param entryData {import('../../../shared/types').EntryData}
 * @param configFolder {string}
 * @param config {import("../../../shared/types").Config}
 */
const getGeneratedList = async (entryData, configFolder, config) => {
  return `
${getStoryImports(entryData)}
${getStoryList(entryData)}
${await getConfigImport(configFolder, config)}
${getComponentsImport(configFolder)}
${getStorySource(entryData, config.addons.source.enabled)}
export const errorMessage = '';\n
`;
};

export default getGeneratedList;
