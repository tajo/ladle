const { converter } = require("../ast-to-obj.js");

/**
 * @param {import('../../../shared/types').ParsedStoriesResult} result
 * @param {any} astPath
 */
const getStorynameAndParameters = (result, astPath) => {
  astPath.node.body.forEach((/** @type {any} */ child) => {
    if (
      child.type === "ExpressionStatement" &&
      child.expression.left &&
      child.expression.left.property
    ) {
      if (child.expression.left.property.name === "storyName") {
        const storyExport = child.expression.left.object.name;
        if (child.expression.right.type !== "StringLiteral") {
          console.log(`${storyExport}.storyName must be a string literal.`);
        } else {
          result.namedExportToStoryName[storyExport] =
            child.expression.right.value;
        }
      } else if (child.expression.left.property.name === "parameters") {
        const storyExport = child.expression.left.object.name;
        if (child.expression.right.type !== "ObjectExpression") {
          console.log(
            `${storyExport}.parameters must be an object expression.`
          );
        } else {
          const obj = converter(child.expression.right);
          const json = JSON.stringify(obj);
          result.namedExportToParameters[storyExport] = JSON.parse(json);
        }
      }
    }
  });
};

module.exports = getStorynameAndParameters;
