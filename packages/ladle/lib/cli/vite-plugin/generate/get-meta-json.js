import { storyIdToMeta } from "../naming-utils.js";

/**
 * @param entryData {import('../../../shared/types').EntryData}
 */
export const getMetaJson = (entryData) => {
  /** @type {string[]} */
  let storyIds = [];
  /** @type {{[key: string]: any}} */
  let storyParams = {};
  /** @type {{[key: string]: any}} */
  let storyMeta = {};
  /** @type {{[key: string]: any}} */
  let namedExports = {};

  Object.keys(entryData).forEach((entry) => {
    entryData[entry].stories.forEach(({ storyId, locStart, locEnd }) => {
      storyMeta[storyId] = { locStart, locEnd, filePath: entry };
      storyIds.push(storyId);
      namedExports = {
        ...namedExports,
        [storyId]: entryData[entry].namedExports,
      };
    });
    storyParams = { ...storyParams, ...entryData[entry].storyParams };
  });
  const result = {
    about: {
      homepage: "https://www.ladle.dev",
      github: "https://github.com/tajo/ladle",
      version: 1,
    },
    stories:
      /** @type {{[key: string]: {name: string; levels: string[]; meta: any, locStart: number; locEnd: number;}}} */ ({}),
  };
  storyIds.forEach((storyId) => {
    result.stories[storyId] = {
      ...storyIdToMeta(storyId),
      ...storyMeta[storyId],
      meta: storyParams[storyId] ? storyParams[storyId].meta : {},
      namedExports: namedExports[storyId]
        ? namedExports[storyId].namedExports
        : {},
    };
  });
  return result;
};

/**
 * @param entryData {import('../../../shared/types').EntryData}
 */
export const getMetaJsonString = (entryData) =>
  JSON.stringify(getMetaJson(entryData), null, "  ");

/**
 * @param entryData {import('../../../shared/types').EntryData}
 */
export const getMetaJsonObject = (entryData) => getMetaJson(entryData);
