import traverse from "@babel/traverse";
import template from "@babel/template";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { promises as fs } from "fs";
import path from "path";
import clonedeep from "lodash.clonedeep";
import merge from "lodash.merge";
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

const getStories = (stories: string[], storiesParams: any) => {
  return generate(
    t.exportNamedDeclaration(
      t.variableDeclaration("let", [
        t.variableDeclarator(
          t.identifier("stories"),
          t.objectExpression(
            stories.map((story) => {
              let paramsAst: any = null;
              if (storiesParams[story]) {
                paramsAst = t.objectProperty(
                  t.identifier("parameters"),
                  (template.ast(
                    `const foo = ${JSON.stringify(storiesParams[story])}`
                  ) as any).declarations[0].init
                );
              }
              return t.objectProperty(
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
                  ...(paramsAst ? [paramsAst] : []),
                ])
              );
            })
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
  const storiesParams: any = {};
  for (let entry of entries) {
    let exportDefaultProps: any = null;
    const namedExportToStoryName: { [key: string]: string } = {};
    const namedExportToParameters: { [key: string]: any } = {};
    const fileId = getFileId(entry);
    const code = await fs.readFile(path.join("./", entry), "utf8");
    const ast = getAst(code, entry);
    traverse(ast, {
      // extracting Story.storyName and Story.parameters
      Program(astPath: any) {
        astPath.node.body.forEach((child: any) => {
          if (
            child.type === "ExpressionStatement" &&
            child.expression.left &&
            child.expression.left.property
          ) {
            if (child.expression.left.property.name === "storyName") {
              const storyExport = child.expression.left.object.name;
              if (child.expression.right.type !== "StringLiteral") {
                console.log(
                  `${storyExport}.storyName must be a string literal.`
                );
              } else {
                namedExportToStoryName[storyExport] =
                  child.expression.right.value;
              }
            } else if (child.expression.left.property.name === "parameters") {
              const storyExport = child.expression.left.object.name;
              if (child.expression.right.type !== "ObjectExpression") {
                console.log(
                  `${storyExport}.parameters must be an object expression.`
                );
              } else {
                const obj = converter(child.expression.right);
                const json = JSON.stringify(obj);
                namedExportToParameters[storyExport] = JSON.parse(json);
              }
            }
          }
        });
      },
      // extracting default export object
      ExportDefaultDeclaration(astPath: any) {
        if (!astPath) return;
        try {
          const obj = converter(astPath.node.declaration);
          const json = JSON.stringify(obj);
          exportDefaultProps = JSON.parse(json);
        } catch (e) {
          console.warn("Default export parsing failed.");
        }
      },
      // extracting story names (named exports)
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
        // attach default parameters to each story
        if (exportDefaultProps && exportDefaultProps.parameters) {
          storiesParams[storyId] = exportDefaultProps;
        }
        // add and merge story specific parameters
        if (namedExportToParameters[namedExport]) {
          storiesParams[storyId] = merge(
            clonedeep(storiesParams[storyId] || {}),
            {
              parameters: namedExportToParameters[namedExport],
            }
          );
        }

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
  return `${output}\n\n${getStories(stories, storiesParams)}`;
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
