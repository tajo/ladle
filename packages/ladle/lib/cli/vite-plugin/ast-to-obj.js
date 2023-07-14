// this code comes from:
// nd-02110114/babel-plugin-object-to-json-parse
// https://github.com/nd-02110114/babel-plugin-object-to-json-parse/blob/master/src/utils.ts

import t from "@babel/types";

/**
 * @param {t.Node | null | undefined} node
 * @returns {boolean}
 */
const isValidJsonValue = (node) => {
  if (
    t.isNumericLiteral(node) ||
    t.isStringLiteral(node) ||
    t.isBooleanLiteral(node) ||
    t.isNullLiteral(node) ||
    t.isArrayExpression(node) ||
    t.isObjectExpression(node)
  ) {
    return true;
  }

  return false;
};

/**
 * Check whether given ObjectExpression consists of only `ObjectProperty`s as its properties.
 * @param {import('@babel/types').ObjectExpression} node
 * @returns {boolean}
 */
const isObjectExpressionWithOnlyObjectProperties = (node) => {
  return node.properties.every((property) => t.isObjectProperty(property));
};

/**
 * @param {import('@babel/types').ObjectProperty[]} properties
 * @returns {boolean}
 */
const isConvertibleObjectProperty = (properties) => {
  return properties.every((node) => !node.computed);
};

/**
 * @param {string} value
 */
const createSafeStringForJsonParse = (value) => {
  if (/\\/.test(value)) {
    value = value.replace(/\\/g, "\\\\");
  }

  if (/"/.test(value)) {
    value = value.replace(/"/g, '\\"');
  }

  if (/[\t\f\r\n\b]/g.test(value)) {
    const codes = ["\f", "\r", "\n", "\t", "\b"];
    const replaceCodes = ["\\f", "\\r", "\\n", "\\t", "\\b"];
    for (let i = 0; i < codes.length; i++) {
      value = value.replace(new RegExp(codes[i], "g"), replaceCodes[i]);
    }
  }

  return value;
};

/**
 * @param {t.Node | null | undefined} node
 * @returns {unknown}
 */
export function converter(node) {
  // for negative number, ex) -10
  if (t.isUnaryExpression(node)) {
    const { operator, argument } = node;
    if (operator === "-" && t.isNumericLiteral(argument)) {
      return -argument.value;
    }
  }

  if (!isValidJsonValue(node)) {
    throw new Error("Invalid value is included.");
  }

  if (t.isStringLiteral(node)) {
    const { value } = node;
    const safeValue = createSafeStringForJsonParse(value);
    return safeValue;
  }

  if (t.isNullLiteral(node)) {
    return null;
  }

  if (t.isArrayExpression(node)) {
    const { elements } = node;
    return elements.map((node) => converter(node));
  }

  if (t.isObjectExpression(node)) {
    if (!isObjectExpressionWithOnlyObjectProperties(node)) {
      throw new Error("Invalid syntax is included.");
    }

    const { properties } = node;
    //@ts-ignore
    if (!isConvertibleObjectProperty(properties)) {
      throw new Error("Invalid syntax is included.");
    }

    return properties.reduce((acc, cur) => {
      //@ts-ignore
      let key = cur.key.name || cur.key.value;
      if (typeof key === "string") {
        key = createSafeStringForJsonParse(key);
      }
      // see issues#10
      if (typeof key === "number" && !Number.isSafeInteger(key)) {
        throw new Error("Invalid syntax is included.");
      }
      //@ts-ignore
      const value = converter(cur.value);
      return { ...acc, [key]: value };
    }, {});
  }
  //@ts-ignore
  return node.value;
}
