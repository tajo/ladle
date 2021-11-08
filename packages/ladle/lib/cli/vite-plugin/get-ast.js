import * as parser from "@babel/parser";
import { codeFrameColumns } from "@babel/code-frame";

/**
 * @type {parser.ParserPlugin[]}
 */
const plugins = [
  "jsx",
  "asyncGenerators",
  "classProperties",
  "classPrivateProperties",
  "classPrivateMethods",
  [
    "decorators",
    {
      decoratorsBeforeExport: true,
    },
  ],
  "doExpressions",
  "dynamicImport",
  "exportDefaultFrom",
  "exportNamespaceFrom",
  "functionBind",
  "functionSent",
  "importMeta",
  "logicalAssignment",
  "nullishCoalescingOperator",
  "numericSeparator",
  "objectRestSpread",
  "optionalCatchBinding",
  "optionalChaining",
  "partialApplication",
  "throwExpressions",
  "topLevelAwait",
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
    process.exit(1);
  }
};

export default getAst;
