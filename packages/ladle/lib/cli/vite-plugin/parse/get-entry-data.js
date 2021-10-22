const fs = require("fs");
const path = require("path");
const traverse = require("@babel/traverse").default;
const { getFileId } = require("../naming-utils.js");
const getAst = require("../get-ast.js");
const getDefaultExport = require("./get-default-export.js");
const getStorynameAndParameters = require("./get-storyname-and-parameters.js");
const getNamedExports = require("./get-named-exports.js");

const debug = require("debug")("ladle:vite");

/**
 * @param {string[]} entries
 */
const getEntryData = async (entries) => {
  /**
   * @type {import('../../../shared/types').EntryData}
   */
  const entryData = {};
  for (let entry of entries) {
    debug(`Parsing ${entry}`);
    entryData[entry] = await getSingleEntry(entry);
  }
  return entryData;
};

/**
 * @param {string} entry
 */
const getSingleEntry = async (entry) => {
  /** @type {import('../../../shared/types').ParsedStoriesResult} */
  const result = {
    entry,
    stories: [],
    exportDefaultProps: { title: undefined, parameters: undefined },
    namedExportToParameters: {},
    namedExportToStoryName: {},
    storyParams: {},
    fileId: getFileId(entry),
  };
  const code = await fs.promises.readFile(
    path.join(process.cwd(), entry),
    "utf8",
  );
  const ast = getAst(code, entry);
  traverse(ast, {
    Program: getStorynameAndParameters.bind(this, result),
    ExportDefaultDeclaration: getDefaultExport.bind(this, result),
    ExportNamedDeclaration: getNamedExports.bind(this, result),
  });
  debug(`Parsed data for ${entry}:`);
  debug(result);
  return result;
};

module.exports = {
  getEntryData,
  getSingleEntry,
};
