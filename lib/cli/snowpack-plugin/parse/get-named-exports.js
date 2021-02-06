const merge = require("lodash.merge");
const clonedeep = require("lodash.clonedeep");
const {
  getEncodedStoryName,
  storyDelimiter,
  titleToFileId,
  kebabCase,
} = require("../naming-utils.js");

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
  },
  astPath
) => {
  /**
   * @type {string}
   */
  const namedExport = astPath.node.declaration.declarations[0].id.name;
  let storyNamespace = fileId;
  if (exportDefaultProps && exportDefaultProps.title) {
    storyNamespace = titleToFileId(exportDefaultProps.title);
  }
  const storyName = namedExportToStoryName[namedExport]
    ? namedExportToStoryName[namedExport]
    : namedExport;
  const storyId = `${kebabCase(
    storyNamespace
  )}${storyDelimiter}${storyDelimiter}${kebabCase(storyName)}`;
  // attach default parameters to each story
  if (exportDefaultProps && exportDefaultProps.parameters) {
    storyParams[storyId] = exportDefaultProps;
  }
  // add and merge story specific parameters
  if (namedExportToParameters[namedExport]) {
    storyParams[storyId] = merge(clonedeep(storyParams[storyId] || {}), {
      parameters: namedExportToParameters[namedExport],
    });
  }
  const componentName = getEncodedStoryName(
    kebabCase(storyNamespace),
    kebabCase(storyName)
  );
  stories.push({
    storyId,
    componentName,
    namedExport,
  });
};

module.exports = getNamedExports;
