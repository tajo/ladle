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
  //capitalize,
} from "../app/src/story-name";
import { kebabCase } from "./utils";

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
      t.variableDeclaration("let", [
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
    export var %%component%% = lazy(() =>
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
        const storyId = `${kebabCase(
          fileId
        )}${storyDelimiter}${storyDelimiter}${kebabCase(storyName)}`;
        stories.push(storyId);
        const componentName = getEncodedStoryName(
          kebabCase(fileId),
          kebabCase(storyName)
        );
        const ast = lazyImport({
          source: t.stringLiteral(
            path.join(path.relative(path.join(cacheDir), process.cwd()), entry)
          ),
          component: t.identifier(componentName),
          story: t.identifier(storyName),
        });
        output += `\n${generate(ast as any).code}`;
      },
    });
  }
  const hot = `if (import.meta.hot) {
    import.meta.hot.accept(({ module }) => {
      if (module.list.every(item => list.includes(item))) {
        stories = module.stories;
        list = module.list;
      } else {
        // full refresh when new stories are added
        // todo, can dynamic import + React Refresh work?
        import.meta.hot.invalidate();
      }
    });
  }`;
  output += `\n\n${getStories(stories)}`;
  return `${output}\nexport let list = ${JSON.stringify(stories)}\n${hot}`;
};

export default getList;
