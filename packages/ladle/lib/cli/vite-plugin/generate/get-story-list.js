import * as t from "@babel/types";
import generate from "@babel/generator";
import template from "@babel/template";
import { storyDelimiter, storyEncodeDelimiter } from "../naming-utils.js";

/**
 * @param entryData {import('../../../shared/types').EntryData}
 */
const getStoryList = (entryData) => {
  /** @type {string[]} */
  let storyIds = [];
  /** @type {{[key: string]: any}} */
  let storyParams = {};

  Object.keys(entryData).forEach((entry) => {
    entryData[entry].stories.forEach(({ storyId }) => {
      storyIds.push(storyId);
    });
    storyParams = { ...storyParams, ...entryData[entry].storyParams };
  });

  const output = /** @type {any} */ (generate).default(
    t.exportNamedDeclaration(
      t.variableDeclaration("let", [
        t.variableDeclarator(
          t.identifier("stories"),
          t.objectExpression(
            storyIds.map((story) => {
              let paramsAst = null;
              if (storyParams[story]) {
                paramsAst = t.objectProperty(
                  t.identifier("parameters"),
                  /** @type {any} */ (template).default.ast(
                    `const foo = ${JSON.stringify(storyParams[story])}`,
                  ).declarations[0].init,
                );
              }
              return t.objectProperty(
                t.stringLiteral(story),
                t.objectExpression([
                  t.objectProperty(
                    t.identifier("component"),
                    t.identifier(
                      story.replace(
                        new RegExp(storyDelimiter, "g"),
                        storyEncodeDelimiter,
                      ),
                    ),
                  ),
                  ...(paramsAst ? [paramsAst] : []),
                ]),
              );
            }),
          ),
        ),
      ]),
    ),
  ).code;
  return output;
};

export default getStoryList;
