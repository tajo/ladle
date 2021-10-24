const traverse = require("@babel/traverse").default;
const fs = require("fs");
const path = require("path");
const debug = require("debug")("ladle:vite");
const getAst = require("../get-ast.js");

/**
 * @param {string} namedExport
 * @param {string} sourceCode
 * @param {string} filename
 */
const checkIfNamedExportExists = (namedExport, sourceCode, filename) => {
  let exists = false;
  const ast = getAst(sourceCode, filename);
  traverse(/** @type {any} */ (ast), {
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

/**
 * @param {string} configFolder
 */
const getComponents = (configFolder) => {
  const noopProvider = `export const Provider = ({children}) => /*#__PURE__*/createElement(Fragment, null, children);\n`;
  const componentsPath = path.join(configFolder, "components.tsx");
  const componentsPathJs = path.join(configFolder, "components.js");
  const componentsExists = fs.existsSync(componentsPath);
  const componentsExistsJs = fs.existsSync(componentsPathJs);
  componentsExists && debug(`${configFolder}/components.tsx found.`);
  componentsExistsJs && debug(`${configFolder}/components.js found.`);

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

module.exports = getComponents;
