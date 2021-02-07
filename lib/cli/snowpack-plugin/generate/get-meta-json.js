const { storyIdToMeta } = require("../naming-utils");

/**
 * @param entryData {import('../../../shared/types').EntryData}
 */
const getMetaJson = (entryData) => {
  /** @type {string[]} */
  let storyIds = [];
  /** @type {{[key: string]: any}} */
  let storyParams = {};

  Object.keys(entryData).forEach((entry) => {
    entryData[entry].stories.forEach(({ storyId }) => {
      storyIds.push(storyId);
    });
    storyParams = { ...storyParams, ...entryData[entry].storyParams };
  });
  const result = {
    about: {
      homepage: "https://www.ladle.dev",
      github: "https://github.com/tajo/ladle",
    },
    stories: /** @type {{[key: string]: {name: string; levels: string[]; parameters: any}}} */ ({}),
  };
  storyIds.forEach((storyId) => {
    result.stories[storyId] = {
      ...storyIdToMeta(storyId),
      parameters: storyParams[storyId] ? storyParams[storyId].parameters : {},
    };
  });
  return JSON.stringify(result, null, "  ");
};

module.exports = getMetaJson;
