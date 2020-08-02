import { parse, ParserPlugin } from "@babel/parser";
import traverse from "@babel/traverse";
import template from "@babel/template";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { promises as fs } from "fs";
import path from "path";
import {
  getFileId,
  getEncodedStoryName,
  storyDelimiter,
  storyEncodeDelimiter,
} from "./app/story-name";

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
                      story.replace(
                        new RegExp(storyDelimiter, "g"),
                        storyEncodeDelimiter
                      )
                    )
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

const getList = async (entries: string[], cacheDir: string) => {
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
    const fileId = getFileId(entry);
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
        const storyId = `${fileId}${storyDelimiter}${storyDelimiter}${storyName.toLowerCase()}`;
        stories.push(storyId);
        const ast = lazyImport({
          source: t.stringLiteral(
            path.join(
              path.relative(path.join(cacheDir, "app"), process.cwd()),
              entry
            )
          ),
          component: t.identifier(getEncodedStoryName(fileId, storyName)),
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
