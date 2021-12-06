import { converter } from "../ast-to-obj.js";

/**
 * @param {import('../../../shared/types').ParsedStoriesResult} result
 * @param {any} astPath
 */
const getStorynameAndMeta = (result, astPath) => {
  astPath.node.body.forEach((/** @type {any} */ child) => {
    if (
      child.type === "ExpressionStatement" &&
      child.expression.left &&
      child.expression.left.property
    ) {
      if (child.expression.left.property.name === "storyName") {
        const storyExport = child.expression.left.object.name;
        if (child.expression.right.type !== "StringLiteral") {
          throw new Error(
            `${storyExport}.storyName in ${result.entry} must be a string literal.`,
          );
        } else {
          result.namedExportToStoryName[storyExport] =
            child.expression.right.value;
        }
      } else if (child.expression.left.property.name === "meta") {
        const storyExport = child.expression.left.object.name;
        if (child.expression.right.type !== "ObjectExpression") {
          throw new Error(
            `${storyExport}.meta in ${result.entry} must be an object expression.`,
          );
        } else {
          try {
            const obj = converter(child.expression.right);
            const json = JSON.stringify(obj);
            result.namedExportToMeta[storyExport] = JSON.parse(json);
          } catch (e) {
            throw new Error(
              `${storyExport}.meta in ${result.entry} must be serializable.`,
            );
          }
        }
      }
    }
  });
};

export default getStorynameAndMeta;
