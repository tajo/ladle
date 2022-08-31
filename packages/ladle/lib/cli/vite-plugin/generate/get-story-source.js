import { createHash } from "crypto";
import t from "@babel/types";
import * as generate from "@babel/generator";

/**
 * @param entryData {import('../../../shared/types').EntryData}
 * @param enabled {boolean}
 */
const getStorySource = (entryData, enabled) => {
  if (!enabled) {
    return "export const storySource = {}";
  }
  /** @type {{[key: string]: string}} */
  const storySource = {};
  /** @type {{[key: string]: string}} */
  const fileSourceCodes = {};
  Object.keys(entryData).forEach((entry) => {
    const fileHash = createHash("sha256")
      .update(entryData[entry].storySource, "utf8")
      .digest("hex")
      .slice(0, 8);
    fileSourceCodes[fileHash] = entryData[entry].storySource;
    entryData[entry].stories.forEach(({ storyId }) => {
      storySource[storyId] = fileHash;
    });
  });

  const fileSources = /** @type {any} */ generate.default(
    t.variableDeclaration("let", [
      t.variableDeclarator(
        t.identifier("fileSourceCodes"),
        t.objectExpression(
          Object.keys(fileSourceCodes).map((fileHash) =>
            t.objectProperty(
              t.stringLiteral(fileHash),
              t.templateLiteral(
                [
                  t.templateElement(
                    {
                      raw: encodeURIComponent(fileSourceCodes[fileHash]),
                      cooked: encodeURIComponent(fileSourceCodes[fileHash]),
                    },
                    true,
                  ),
                ],
                [],
              ),
            ),
          ),
        ),
      ),
    ]),
  ).code;

  const storyToSource = /** @type {any} */ generate.default(
    t.exportNamedDeclaration(
      t.variableDeclaration("let", [
        t.variableDeclarator(
          t.identifier("storySource"),
          t.objectExpression(
            Object.keys(storySource).map((storyId) =>
              t.objectProperty(
                t.stringLiteral(storyId),
                t.identifier(`fileSourceCodes["${storySource[storyId]}"]`),
              ),
            ),
          ),
        ),
      ]),
    ),
  ).code;
  return `${fileSources}\n${storyToSource}\n`;
};

export default getStorySource;
