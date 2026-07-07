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
    if (
      ["TSAsExpression", "TSSatisfiesExpression"].includes(
        astPath.node.declaration.type,
      )
    ) {
      objNode = astPath.node.declaration.expression;
    }
    // Unwrap TSSatisfiesExpression / TSAsExpression that appears as the *init*
    // of a named identifier default-export, e.g.
    //   const meta = { ... } satisfies Meta<typeof X>;
    //   export default meta;
    // The named-identifier branch above resolves `objNode` to the init
    // expression, but does not strip the `satisfies` wrapper.
    if (
      objNode &&
      (objNode.type === "TSAsExpression" ||
        objNode.type === "TSSatisfiesExpression")
    ) {
      objNode = objNode.expression;
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
