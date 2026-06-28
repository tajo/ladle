import * as parser from "@babel/parser";
import { codeFrameColumns } from "@babel/code-frame";

/**
 * @type {parser.ParserPlugin[]}
 */
const plugins = [
  "jsx",
  // Babel 8 enables the formerly-experimental ECMAScript proposals by default
  // (class fields/private methods, optional chaining, nullish coalescing,
  // logical assignment, numeric separators, object rest/spread, dynamic
  // import, top-level await, etc.), so they no longer need to be listed as
  // parser plugins.
  "decorators",
  "doExpressions",
  "exportDefaultFrom",
  "functionBind",
  "functionSent",
  "importMeta",
  "partialApplication",
  "throwExpressions",
];

/**
 * @param {string} code
 * @param {string} filename
 */
const getAst = (code, filename) => {
  try {
    return parser.parse(code, {
      sourceType: "module",
      plugins: [
        ...plugins,
        filename.endsWith(".ts") || filename.endsWith(".tsx")
          ? "typescript"
          : "flow",
      ],
    });
  } catch (/** @type {any} */ e) {
    console.log(" ");
    console.log(" ");
    console.log(`${e.toString()} in ${filename}`);
    console.log("");
    console.log(
      codeFrameColumns(
        code,
        { start: e.loc },
        {
          highlightCode: true,
        },
      ),
    );
    console.log("");
    throw e;
  }
};

export default getAst;
