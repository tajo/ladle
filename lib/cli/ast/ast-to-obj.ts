// this code comes from:
// nd-02110114/babel-plugin-object-to-json-parse
// https://github.com/nd-02110114/babel-plugin-object-to-json-parse/blob/master/src/utils.ts

import {
  isArrayExpression,
  isBooleanLiteral,
  isObjectExpression,
  isNullLiteral,
  isNumericLiteral,
  isUnaryExpression,
  isStringLiteral,
  ObjectExpression,
  ObjectProperty,
  isObjectProperty,
  NumericLiteral,
  StringLiteral,
  BooleanLiteral,
  ArrayExpression,
  NullLiteral,
} from "@babel/types";

type ValidJsonValue =
  | NumericLiteral
  | StringLiteral
  | BooleanLiteral
  | NullLiteral
  | ArrayExpression
  | ObjectExpression;

const isValidJsonValue = (
  node: object | null | undefined
): node is ValidJsonValue => {
  if (
    isNumericLiteral(node) ||
    isStringLiteral(node) ||
    isBooleanLiteral(node) ||
    isNullLiteral(node) ||
    isArrayExpression(node) ||
    isObjectExpression(node)
  ) {
    return true;
  }

  return false;
};

type ObjectExpressionWithOnlyObjectProperties = Omit<
  ObjectExpression,
  "properties"
> & {
  properties: ObjectProperty[];
};

/**
 * Check whether given ObjectExpression consists of only `ObjectProperty`s as its properties.
 */
const isObjectExpressionWithOnlyObjectProperties = (
  node: ObjectExpression
): node is ObjectExpressionWithOnlyObjectProperties => {
  return node.properties.every((property) => isObjectProperty(property));
};

const isConvertibleObjectProperty = (properties: ObjectProperty[]) => {
  return properties.every((node) => !node.computed);
};

const createSafeStringForJsonParse = (value: string) => {
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

export function converter(node: object | null | undefined): unknown {
  // for negative number, ex) -10
  if (isUnaryExpression(node)) {
    const { operator, argument } = node;
    if (operator === "-" && isNumericLiteral(argument)) {
      return -argument.value;
    }
  }

  if (!isValidJsonValue(node)) {
    throw new Error("Invalid value is included.");
  }

  if (isStringLiteral(node)) {
    const { value } = node;
    const safeValue = createSafeStringForJsonParse(value);
    return safeValue;
  }

  if (isNullLiteral(node)) {
    return null;
  }

  if (isArrayExpression(node)) {
    const { elements } = node;
    return elements.map((node) => converter(node));
  }

  if (isObjectExpression(node)) {
    if (!isObjectExpressionWithOnlyObjectProperties(node)) {
      throw new Error("Invalid syntax is included.");
    }

    const { properties } = node;
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
      const value = converter(cur.value);
      return { ...acc, [key]: value };
    }, {});
  }

  return node.value;
}
