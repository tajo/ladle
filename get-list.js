const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const template = require("@babel/template").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const fs = require("fs").promises;
const path = require("path");
const { relAppPath } = require("./const");

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

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getStories = (stories) => {
  return generate(
    t.exportNamedDeclaration(
      t.variableDeclaration("const", [
        t.variableDeclarator(
          t.identifier("stories"),
          t.objectExpression(
            stories.map((story) =>
              t.objectProperty(
                t.stringLiteral(story),
                t.objectExpression([
                  t.objectProperty(
                    t.identifier("component"),
                    t.identifier(
                      `${story.split("--")[0]}${
                        story.split("--")[1]
                      }`.toLowerCase()
                    )
                  ),
                  t.objectProperty(
                    t.identifier("name"),
                    t.stringLiteral(capitalize(story.split("--")[1]))
                  ),
                ])
              )
            )
          )
        ),
      ])
    )
  ).code;
};

const getList = async (entries) => {
  let output = `import { lazy } from "react";\n`;
  const lazyImport = template(`
    const %%component%% = lazy(() =>
     import(%%source%%).then((module) => {
        return { default: module.%%story%% };
      })
    );
  `);
  const stories = [];
  for (entry of entries) {
    const fileId = entry.split("/")[1].split(".")[0];
    const code = await fs.readFile(path.join("./", entry), "utf8");
    const ast = parse(code, {
      sourceType: "module",
      plugins: [
        ...plugins,
        entry.endsWith(".ts") || entry.endsWith(".tsx") ? "typescript" : "flow",
      ],
    });
    traverse(ast, {
      ExportNamedDeclaration: (astPath) => {
        const storyName = astPath.node.declaration.declarations[0].id.name;
        const storyId = `${fileId}--${storyName.toLowerCase()}`;
        stories.push(storyId);
        const ast = lazyImport({
          source: t.stringLiteral(path.join(relAppPath, entry)),
          component: t.identifier(`${fileId}${storyName}`.toLocaleLowerCase()),
          story: t.identifier(storyName),
        });
        output += `\n${generate(ast).code}`;
      },
    });
  }
  output += `\n\n${getStories(stories)}`;
  return output;
};

module.exports = getList;
