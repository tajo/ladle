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
    if (astPath.node.declaration.type === "TSAsExpression") {
      objNode = astPath.node.declaration.expression;
    }
    objNode &&
      objNode.properties.forEach((/** @type {any} */ prop) => {
        if (prop.type === "ObjectProperty" && prop.key.name === "title") {
          if (prop.value.type !== "StringLiteral") {
            throw new Error("Default title must be a string literal.");
          }
          result.exportDefaultProps.title = prop.value.value;
        } else if (
          prop.type === "ObjectProperty" &&
          prop.key.type === "Identifier" &&
          prop.key.name === "meta"
        ) {
          const obj = converter(prop.value);
          const json = JSON.stringify(obj);
          result.exportDefaultProps.meta = JSON.parse(json);
        }
      });
  } catch (e) {
    throw new Error(
      `Can't parse the default title and meta of ${result.entry}. Meta must be serializable and title a string literal.`,
    );
  }
};

export default getDefaultExport;
