import traverse from "@babel/traverse";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import debugFactory from "debug";
import getAst from "../get-ast.js";

const debug = debugFactory("ladle:vite");
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @param {string} namedExport
 * @param {string} sourceCode
 * @param {string} filename
 */
const checkIfNamedExportExists = (namedExport, sourceCode, filename) => {
  let exists = false;
  const ast = getAst(sourceCode, filename);
  /** @type {any} */ (traverse).default(ast, {
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
    const componentsRelativePath = path.relative(
      path.join(__dirname, "../../../app/src"),
      path.join(
        configFolder,
        componentsExists ? "components.tsx" : "components.js",
      ),
    );
    if (checkIfNamedExportExists("Provider", sourceCode, filename)) {
      debug(`Custom provider found.`);
      return `import {Provider as CustomProvider} from '${componentsRelativePath}';\nexport const Provider = CustomProvider;\n`;
    }
    debug("components.tsx exists");
    debug(`Returning default no-op Provider.`);
    return `import '${componentsRelativePath}';\n${noopProvider}`;
  }
  debug(`Returning default no-op Provider.`);
  return noopProvider;
};

export default getComponents;
