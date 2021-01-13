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
  titleToFileId,
} from "../../app/src/story-name";
import { appSrcDir } from "../const";
import { kebabCase } from "../utils";
import getAst from "./get-ast";
import { converter } from "./ast-to-obj";

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

export const getList = async (entries: string[]) => {
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
    let exportDefaultProps: any = null;
    let exportDefault: any = null;
    const namedExportToStoryName: { [key: string]: string } = {};
    const fileId = getFileId(entry);
    const code = await fs.readFile(path.join("./", entry), "utf8");
    const ast = getAst(code, entry);
    traverse(ast, {
      Program(astPath: any) {
        astPath.node.body.forEach((child: any) => {
          if (
            child.type === "ExpressionStatement" &&
            child.expression.left &&
            child.expression.left.property &&
            child.expression.left.property.name === "storyName"
          ) {
            const storyExport = child.expression.left.object.name;
            if (child.expression.right.type !== "StringLiteral") {
              console.log(`${storyExport}.storyName must be a string literal.`);
            } else {
              namedExportToStoryName[storyExport] =
                child.expression.right.value;
            }
          }
        });
      },
      ExportDefaultDeclaration(astPath: any) {
        if (!astPath) return;
        exportDefault = astPath.node.declaration;
        try {
          const obj = converter(exportDefault);
          const json = JSON.stringify(obj);
          exportDefaultProps = JSON.parse(json);
        } catch (e) {
          console.warn("Default export parsing failed.");
        }
      },
      ExportNamedDeclaration: (astPath: any) => {
        const namedExport: string =
          astPath.node.declaration.declarations[0].id.name;
        let storyNamespace = fileId;
        if (exportDefaultProps && exportDefaultProps.title) {
          storyNamespace = titleToFileId(exportDefaultProps.title);
        }
        const storyName = namedExportToStoryName[namedExport]
          ? namedExportToStoryName[namedExport]
          : namedExport;
        const storyId = `${kebabCase(
          storyNamespace
        )}${storyDelimiter}${storyDelimiter}${kebabCase(storyName)}`;
        stories.push(storyId);
        const componentName = getEncodedStoryName(
          kebabCase(storyNamespace),
          kebabCase(storyName)
        );
        const ast = lazyImport({
          source: t.stringLiteral(
            path.join(path.relative(appSrcDir, process.cwd()), entry)
          ),
          component: t.identifier(componentName),
          story: t.identifier(namedExport),
        });
        output += `\n${generate(ast as any).code}`;
      },
    });
  }
  return `${output}\n\n${getStories(stories)}`;
};

export const getListWithHmr = async (entries: string[]) => {
  const hot = `if (import.meta.hot) {
    import.meta.hot.accept(({ module }) => {
      if (Object.keys(module.stories).every(item => Object.keys(stories).includes(item))) {
        stories = module.stories;
      } else {
        // full refresh when new stories are added
        // todo, can dynamic import + React Refresh work?
        import.meta.hot.invalidate();
      }
    });
  }`;
  return `${await getList(entries)}\n${hot}`;
};
