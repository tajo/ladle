import { parse, ParserPlugin } from "@babel/parser";

const plugins: ParserPlugin[] = [
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

const getAst = (code: string, filename: string) =>
  parse(code, {
    sourceType: "module",
    plugins: [
      ...plugins,
      filename.endsWith(".ts") || filename.endsWith(".tsx")
        ? "typescript"
        : "flow",
    ],
  });

export default getAst;
