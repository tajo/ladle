const traverse = require("@babel/traverse").default;
const template = require("@babel/template").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const fs = require("fs");
const path = require("path");
const clonedeep = require("lodash.clonedeep");
const merge = require("lodash.merge");
const {
  getFileId,
  getEncodedStoryName,
  storyDelimiter,
  storyEncodeDelimiter,
  titleToFileId,
  kebabCase,
} = require("./naming-utils.js");
const { appSrcDir } = require("./const.js");
const getAst = require("./get-ast.js");
const { converter } = require("./ast-to-obj.js");

/**
 * @param {string[]} stories
 * @param {any} storiesParams
 */
const getStories = (stories, storiesParams) => {
  return generate(
    t.exportNamedDeclaration(
      t.variableDeclaration("let", [
        t.variableDeclarator(
          t.identifier("stories"),
          t.objectExpression(
            stories.map((story) => {
              let paramsAst = null;
              if (storiesParams[story]) {
                paramsAst = t.objectProperty(
                  t.identifier("parameters"),
                  /** @type {any} */ (template.ast(
                    `const foo = ${JSON.stringify(storiesParams[story])}`
                  )).declarations[0].init
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

/**
 * @param {string[]} entries
 */
const getList = async (entries) => {
  let output = `import { lazy } from "react";\n`;
  const lazyImport = template(`
    const %%component%% = lazy(() =>
     import(%%source%%).then((module) => {
        return { default: module.%%story%% };
      })
    );
  `);
  /**
   * @type {string []}
   */
  const stories = [];
  /**
   * @type {any}
   */
  const storiesParams = {};
  for (let entry of entries) {
    /**
     * @type {any}
     */
    let exportDefaultProps = null;
    /**
     * @type {{[key: string]: string}}
     */
    const namedExportToStoryName = {};
    /**
     * @type {{[key: string]: any}}
     */
    const namedExportToParameters = {};
    const fileId = getFileId(entry);
    const code = await fs.promises.readFile(path.join("./", entry), "utf8");
    const ast = getAst(code, entry);
    traverse(ast, {
      // extracting Story.storyName and Story.parameters
      /**
       * @param {any} astPath
       */
      Program(astPath) {
        astPath.node.body.forEach((/** @type {any} */ child) => {
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
      /**
       * @param {any} astPath
       */
      ExportDefaultDeclaration(astPath) {
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
      /**
       * @param {any} astPath
       */
      ExportNamedDeclaration: (astPath) => {
        /**
         * @type {string}
         */
        const namedExport = astPath.node.declaration.declarations[0].id.name;
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
        output += `\n${generate(/** @type {any} */ (ast)).code}`;
      },
    });
  }
  return `${output}\n\n${getStories(stories, storiesParams)}`;
};

const getConfigImport = () => {
  const configPath = path.join(process.cwd(), "./.ladle/config.mjs");
  const configExists = fs.existsSync(configPath);
  const relativePath = path.relative(
    path.join(__dirname, "../../app/src"),
    configPath
  );
  let configCode = `export let config = {};\n`;
  if (configExists) {
    configCode += `import customConfig from '${relativePath}';\nconfig = customConfig;\n`;
  }
  return `${configCode}`;
};

/**
 * @param {string[]} entries
 */
const getListWithHmr = async (entries) => {
  const hot = `if (import.meta.hot) {
    import.meta.hot.accept(({ module }) => {
      if (Object.keys(module.stories).every(item => Object.keys(stories).includes(item))) {
        stories = module.stories;
        config = module.config;
      } else {
        // full refresh when new stories are added
        // todo, can dynamic import + React Refresh work?
        import.meta.hot.invalidate();
      }
    });
  }`;
  return `${await getList(entries)}\n${getConfigImport()}\n${hot}`;
};

module.exports = {
  getList,
  getListWithHmr,
};
