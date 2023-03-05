import fs from "fs";
import path from "path";
import debugFactory from "debug";
import { traverse } from "../babel.js";
import getAst from "../get-ast.js";
import cleanupWindowsPath from "./cleanup-windows-path.js";

const debug = debugFactory("ladle:vite");

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

/**
 * @param {string} configFolder
 */
const getComponents = (configFolder) => {
  let defaultProvider = `export const Provider = ({children}) => /*#__PURE__*/createElement(Fragment, null, children);\n`;
  let defaultStorySourceHeader = `export const StorySourceHeader = ({ path }) => /*#__PURE__*/createElement('div', { style: { paddingTop: "2em" }}, /*#__PURE__*/createElement('code', { className: "ladle-code" }, path));\n`;
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
    debug(`Custom components.{tsx,ts,jsx,js} not found.`);
    return `${defaultProvider}${defaultStorySourceHeader}`;
  }

  const sourceCode = fs.readFileSync(firstFoundComponentsPath, "utf8");
  const filename = path.basename(firstFoundComponentsPath);

  firstFoundComponentsPath && debug(`${configFolder}/${filename} found.`);

  const isProvider = checkIfNamedExportExists("Provider", sourceCode, filename);
  const isStorySourceHeader = checkIfNamedExportExists(
    "StorySourceHeader",
    sourceCode,
    filename,
  );

  if (!isStorySourceHeader && !isProvider) {
    return `import '${cleanupWindowsPath(
      path.join(configFolder, filename),
    )}';\n${defaultProvider}${defaultStorySourceHeader}`;
  }

  let output = "";
  const componentsPath = cleanupWindowsPath(path.join(configFolder, filename));

  if (isProvider) {
    debug(`Custom Provider found.`);
    output += `export { Provider } from '${componentsPath}';\n`;
  } else {
    debug(`Custom Provider not found. Returning the default.`);
    output += defaultProvider;
  }

  if (isStorySourceHeader) {
    debug(`Custom StorySourceHeader found.`);
    output += `export { StorySourceHeader } from '${componentsPath}';\n`;
  } else {
    debug(`Custom StorySourceHeader not found. Returning the default.`);
    output += defaultStorySourceHeader;
  }

  return output;
};

export default getComponents;
