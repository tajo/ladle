const t = require("@babel/types");
const { storyDelimiter, storyEncodeDelimiter } = require("../naming-utils.js");
const generate = require("@babel/generator").default;
const template = require("@babel/template").default;

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

  const output = generate(
    /** @type {any} */ (t.exportNamedDeclaration(
      t.variableDeclaration("let", [
        t.variableDeclarator(
          t.identifier("stories"),
          t.objectExpression(
            storyIds.map((story) => {
              let paramsAst = null;
              if (storyParams[story]) {
                paramsAst = t.objectProperty(
                  t.identifier("parameters"),
                  /** @type {any} */ (template.ast(
                    `const foo = ${JSON.stringify(storyParams[story])}`,
                  )).declarations[0].init,
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
    )),
  ).code;
  return output;
};

module.exports = getStoryList;
