import t from "@babel/types";
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
  /** @type {{[key: string]: { locStart: number; locEnd: number; entry: string;}}} */
  let storyLocs = {};

  Object.keys(entryData).forEach((entry) => {
    entryData[entry].stories.forEach(({ storyId, locStart, locEnd }) => {
      storyIds.push(storyId);
      storyLocs[storyId] = {
        locStart,
        locEnd,
        entry,
      };
    });
    storyParams = { ...storyParams, ...entryData[entry].storyParams };
  });

  const output = /** @type {any} */ generate(
    t.exportNamedDeclaration(
      t.variableDeclaration("let", [
        t.variableDeclarator(
          t.identifier("stories"),
          t.objectExpression(
            storyIds.map((story) => {
              let paramsAst = null;
              if (storyParams[story]) {
                paramsAst = t.objectProperty(
                  t.identifier("meta"),
                  /** @type {any} */ (
                    template.ast(
                      `const foo = ${JSON.stringify(storyParams[story])}`,
                    )
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
                  t.objectProperty(
                    t.identifier("locStart"),
                    t.numericLiteral(storyLocs[story].locStart),
                  ),
                  t.objectProperty(
                    t.identifier("locEnd"),
                    t.numericLiteral(storyLocs[story].locEnd),
                  ),
                  t.objectProperty(
                    t.identifier("entry"),
                    t.stringLiteral(storyLocs[story].entry),
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
