import { converter } from "../ast-to-obj.js";

/**
 * @param {import('../../../shared/types').ParsedStoriesResult} result
 * @param {any} astPath
 */
const getDefaultExport = (result, astPath) => {
  if (!astPath) return;
  try {
    let objNode = astPath.node.declaration;
    if (astPath.node.declaration.type === "Identifier") {
      objNode =
        astPath.scope.bindings[astPath.node.declaration.name].path.node.init;
    }
    const obj = converter(objNode);
    const json = JSON.stringify(obj);
    result.exportDefaultProps = JSON.parse(json);
  } catch (e) {
    throw new Error(
      `Can't parse the default export of ${result.entry}. It must be serializable.`,
    );
  }
};

export default getDefaultExport;
