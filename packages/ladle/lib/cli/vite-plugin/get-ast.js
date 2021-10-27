import parser from "@babel/parser";

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
const getAst = (code, filename) =>
  parser.parse(code, {
    sourceType: "module",
    plugins: [
      ...plugins,
      filename.endsWith(".ts") || filename.endsWith(".tsx")
        ? "typescript"
        : "flow",
    ],
  });

export default getAst;
