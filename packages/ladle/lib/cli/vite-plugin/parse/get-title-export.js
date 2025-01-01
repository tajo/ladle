/**
 * @param {import('../../../shared/types').ParsedStoriesResult} result
 * @param {any} astPath
 */
const getTitleExport = (result, astPath) => {
  if (!astPath?.node?.declaration) return;

  if (astPath.node.declaration.type === "VariableDeclaration") {
    const declarations = astPath.node.declaration.declarations;

    for (const declaration of declarations) {
      if (declaration.id.name === "TITLE") {
        if (declaration.init.type !== "StringLiteral") {
          throw new Error("TITLE export must be a string literal.");
        }
        result.exportDefaultProps.title = declaration.init.value;
        return;
      }
    }
  }
};

export default getTitleExport;
