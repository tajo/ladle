const traverse = require("@babel/traverse").default;
const template = require("@babel/template").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const fs = require("fs");
const path = require("path");
const {
  getFileId,
  storyDelimiter,
  storyEncodeDelimiter,
} = require("./naming-utils.js");
const getAst = require("./get-ast.js");

const getDefaultExport = require("./parse/get-default-export.js");
const getStorynameAndParameters = require("./parse/get-storyname-and-parameters.js");
const getNamedExports = require("./parse/get-named-exports.js");

const debug = require("debug")("ladle:snowpack");

/**
 * @param {string[]} stories
 * @param {any} storiesParams
 */
const getStories = (stories, storiesParams) => {
  debug(`Generating stories code for ${stories}`);
  const output = generate(
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
  return output;
};

/**
 * @param {string[]} entries
 * @returns {Promise<[string, string[], any]>}
 */
const getList = async (entries) => {
  let output = `import * as React from "./_snowpack/pkg/react.js";\n`;
  const lazyImport = template(`
    const %%component%% = React.lazy(() =>
     import(%%source%%).then((module) => {
        return { default: module.%%story%% };
      })
    );
  `);
  /**
   * @type {string []}
   */
  let storyIds = [];
  let storyParams = {};
  /**
   * @type {any}
   */
  for (let entry of entries) {
    debug(`Parsing ${entry}`);
    /** @type {import('../../shared/types').ParsedStoriesResult} */
    const result = {
      entry,
      stories: [],
      exportDefaultProps: { title: undefined, parameters: undefined },
      namedExportToParameters: {},
      namedExportToStoryName: {},
      storyParams: {},
      fileId: getFileId(entry),
    };
    const code = await fs.promises.readFile(path.join("./", entry), "utf8");
    const ast = getAst(code, entry);
    traverse(ast, {
      Program: getStorynameAndParameters.bind(this, result),
      ExportDefaultDeclaration: getDefaultExport.bind(this, result),
      ExportNamedDeclaration: getNamedExports.bind(this, result),
    });
    debug("Parsed data:");
    debug(result);
    result.stories.forEach(({ componentName, namedExport, storyId }) => {
      const ast = lazyImport({
        source: t.stringLiteral(`./${entry}`.replace(/\.tsx?$/, ".js")),
        component: t.identifier(componentName),
        story: t.identifier(namedExport),
      });
      storyIds.push(storyId);
      output += `\n${generate(/** @type {any} */ (ast)).code}`;
    });
    storyParams = { ...storyParams, ...result.storyParams };
  }
  const listAst = `${output}\n\n${getStories(storyIds, storyParams)}`;
  return [listAst, storyIds, storyParams];
};

const getConfigImport = () => {
  const configPath = path.join(process.cwd(), "./.ladle/config.mjs");
  const configExists = fs.existsSync(configPath);
  const relativePath = "./config.js";
  let configCode = `export let config = {};\n`;
  if (configExists) {
    configCode += `import customConfig from '${relativePath}';\nconfig = customConfig;\n`;
  }
  return `${configCode}`;
};

/**
 * @param {string} namedExport
 * @param {string} sourceCode
 * @param {string} filename
 */
const checkIfNamedExportExists = (namedExport, sourceCode, filename) => {
  let exists = false;
  const ast = getAst(sourceCode, filename);
  traverse(ast, {
    /**
     * @param {any} astPath
     */
    ExportNamedDeclaration: (astPath) => {
      if (astPath.node.declaration.declarations[0].id.name === namedExport) {
        exists = true;
      }
    },
  });
  return exists;
};

const getProviderImport = () => {
  const noopProvider = `export const Provider = ({children}) => /*#__PURE__*/React.createElement(React.Fragment, null, children);\n`;
  const componentsPath = path.join(process.cwd(), "./.ladle/components.tsx");
  const componentsPathJs = path.join(process.cwd(), "./.ladle/components.js");
  const componentsExists = fs.existsSync(componentsPath);
  const componentsExistsJs = fs.existsSync(componentsPathJs);
  componentsExists && debug(`.ladle/components.tsx found.`);
  componentsExistsJs && debug(`.ladle/components.js found.`);

  let sourceCode = "";
  let filename = "";
  let relativePath = "./components.js";

  if (componentsExistsJs) {
    sourceCode = fs.readFileSync(componentsPathJs, "utf8");
    filename = "components.js";
  }

  // tsx > js
  if (componentsExists) {
    sourceCode = fs.readFileSync(componentsPath, "utf8");
    filename = "components.tsx";
  }

  if (componentsExists || componentsExistsJs) {
    if (checkIfNamedExportExists("Provider", sourceCode, filename)) {
      debug(`Custom provider found.`);
      return `import {Provider as CustomProvider} from '${relativePath}';\nexport const Provider = CustomProvider;\n`;
    }
    debug("components.tsx exists");
    debug(`Returning default no-op Provider.`);
    return `import '${relativePath}';\n${noopProvider}`;
  }
  debug(`Returning default no-op Provider.`);
  return noopProvider;
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
  const [listAst] = await getList(entries);
  return `${listAst}\n${getConfigImport()}\n${getProviderImport()}\n${hot}`;
};

module.exports = {
  getList,
  getListWithHmr,
};
