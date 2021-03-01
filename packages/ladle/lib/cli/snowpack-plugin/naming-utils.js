const storyDelimiter = "-";
const storyEncodeDelimiter = "$";

// BUT preserving delimiters --
const wordSeparators = /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,.\/:;<=>?@\[\]^_`{|}~]+/;
const capitals = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]/g;

/**
 * @param {string} str
 */
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * @param {string} str
 * @returns {{name: string; levels: string[]}}
 */
const storyIdToMeta = (str) => {
  const parts = str
    .split(`${storyDelimiter}${storyDelimiter}`)
    .map((level) => capitalize(level.replace(/-/g, " ")));
  return {
    name: /** @type {string} */ (parts.pop()),
    levels: parts,
  };
};

/**
 * @param {string} str
 */
const kebabCase = (str) => {
  //replace capitals with space + lower case equivalent for later parsing
  str = str.replace(capitals, function (match) {
    return " " + (match.toLowerCase() || match);
  });
  return str.trim().split(wordSeparators).join("-");
};

/**
 * @param {string} title
 */
const titleToFileId = (title) =>
  title
    .toLocaleLowerCase()
    .replace(/\s*\/\s*/g, `${storyDelimiter}${storyDelimiter}`)
    .replace(/\s+/g, storyDelimiter);

/**
 * @param {string} filename
 */
const getFileId = (filename) => {
  const pathParts = filename.split("/");
  return pathParts[pathParts.length - 1].split(".")[0];
};

/**
 * @param {string} fileId
 * @param {string} namedExport
 */
const getEncodedStoryName = (fileId, namedExport) => {
  return `${fileId}${storyEncodeDelimiter}${storyEncodeDelimiter}${namedExport}`
    .toLocaleLowerCase()
    .replace(new RegExp(storyDelimiter, "g"), storyEncodeDelimiter);
};

module.exports = {
  storyDelimiter,
  storyEncodeDelimiter,
  titleToFileId,
  getFileId,
  getEncodedStoryName,
  kebabCase,
  storyIdToMeta,
};
