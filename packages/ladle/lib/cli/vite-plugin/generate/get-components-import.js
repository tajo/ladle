import * as traverse from "@babel/traverse";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import debugFactory from "debug";
import getAst from "../get-ast.js";
import cleanupWindowsPath from "./cleanup-windows-path.js";

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
  // order matters. if tsx isn't found, ts is used, then jsx, then js.
  const componentsPaths = [
    path.join(configFolder, "components.tsx"),
    path.join(configFolder, "components.ts"),
    path.join(configFolder, "components.jsx"),
    path.join(configFolder, "components.js"),
  ];
  const firstFoundComponentsPath = componentsPaths.find((componentsPath) =>
    fs.existsSync(componentsPath),
  );

  if (!firstFoundComponentsPath) {
    debug(`Returning default no-op Provider.`);
    return noopProvider;
  }

  const sourceCode = fs.readFileSync(firstFoundComponentsPath, "utf8");
  const filename = path.basename(firstFoundComponentsPath);

  firstFoundComponentsPath && debug(`${configFolder}/${filename} found.`);

  const componentsRelativePath = cleanupWindowsPath(
    path.relative(
      path.join(__dirname, "../../../app/src"),
      path.join(configFolder, filename),
    ),
  ).slice(2);
  if (checkIfNamedExportExists("Provider", sourceCode, filename)) {
    debug(`Custom provider found.`);
    return `import {Provider as CustomProvider} from '${componentsRelativePath}';\nexport const Provider = CustomProvider;\n`;
  }
  debug(`Custom provider not found.`);
  debug(`Returning default no-op Provider.`);
  return `import '${componentsRelativePath}';\n${noopProvider}`;
};

export default getComponents;
