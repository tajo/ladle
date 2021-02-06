const { converter } = require("../ast-to-obj.js");

/**
 * @param {import('../../../shared/types').ParsedStoriesResult} result
 * @param {string} entry
 * @param {any} astPath
 */
const getDefaultExport = (result, entry, astPath) => {
  if (!astPath) return;
  try {
    const obj = converter(astPath.node.declaration);
    const json = JSON.stringify(obj);
    result.exportDefaultProps = JSON.parse(json);
  } catch (e) {
    console.warn(
      `${entry}: Can't parse the default export. It needs to be serializable. `
    );
  }
};

module.exports = getDefaultExport;
