import { parse, ParserPlugin } from "@babel/parser";
import traverse from "@babel/traverse";
import template from "@babel/template";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { promises as fs } from "fs";
import path from "path";
import { relAppPath } from "./const";

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

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getStories = (stories: string[]) => {
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

const getList = async (entries: string[]) => {
  let output = `import { lazy } from "react";\n`;
  const lazyImport = template(`
    const %%component%% = lazy(() =>
     import(%%source%%).then((module) => {
        return { default: module.%%story%% };
      })
    );
  `);
  const stories: string[] = [];
  for (let entry of entries) {
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
      ExportNamedDeclaration: (astPath: any) => {
        const storyName = astPath.node.declaration.declarations[0].id.name;
        const storyId = `${fileId}--${storyName.toLowerCase()}`;
        stories.push(storyId);
        const ast = lazyImport({
          source: t.stringLiteral(path.join(relAppPath, entry)),
          component: t.identifier(`${fileId}${storyName}`.toLocaleLowerCase()),
          story: t.identifier(storyName),
        });
        output += `\n${generate(ast as any).code}`;
      },
    });
  }
  output += `\n\n${getStories(stories)}`;
  return output;
};

export default getList;
