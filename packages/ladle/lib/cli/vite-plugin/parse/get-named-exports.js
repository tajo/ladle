import cloneDeep from "lodash.clonedeep";
import merge from "lodash.merge";
import {
  getEncodedStoryName,
  storyDelimiter,
  titleToFileId,
  kebabCase,
} from "../naming-utils.js";

/**
 * @param {import('../../../shared/types').ParsedStoriesResult} result
 * @param {any} astPath
 */
const getNamedExports = (
  {
    fileId,
    exportDefaultProps,
    namedExportToParameters,
    namedExportToStoryName,
    storyParams,
    stories,
    entry,
  },
  astPath,
) => {
  /**
   * @type {string}
   */
  let namedExport = "";
  const namedExportDeclaration = astPath.node.declaration;
  if (namedExportDeclaration.type === "ClassDeclaration") {
    namedExport = namedExportDeclaration.id.name;
  } else if (namedExportDeclaration.type === "VariableDeclaration") {
    namedExport = namedExportDeclaration.declarations[0].id.name;
  } else if (namedExportDeclaration.type === "FunctionDeclaration") {
    namedExport = namedExportDeclaration.id.name;
  } else {
    throw new Error(
      `Named export in ${entry} must be variable, class or function.`,
    );
  }

  let storyNamespace = fileId;
  if (exportDefaultProps && exportDefaultProps.title) {
    storyNamespace = titleToFileId(exportDefaultProps.title);
  }
  const storyName = namedExportToStoryName[namedExport]
    ? namedExportToStoryName[namedExport]
    : namedExport;
  const storyId = `${kebabCase(
    storyNamespace,
  )}${storyDelimiter}${storyDelimiter}${kebabCase(storyName)}`;
  // attach default parameters to each story
  if (exportDefaultProps && exportDefaultProps.parameters) {
    storyParams[storyId] = exportDefaultProps;
  }
  // add and merge story specific parameters
  if (namedExportToParameters[namedExport]) {
    storyParams[storyId] = merge(cloneDeep(storyParams[storyId] || {}), {
      parameters: namedExportToParameters[namedExport],
    });
  }
  const componentName = getEncodedStoryName(
    kebabCase(storyNamespace),
    kebabCase(storyName),
  );
  stories.push({
    storyId,
    componentName,
    namedExport,
    locStart: namedExportDeclaration.loc.start.line,
    locEnd: namedExportDeclaration.loc.end.line,
  });
};

export default getNamedExports;
