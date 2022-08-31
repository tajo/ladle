import traverse from "@babel/traverse";
import cloneDeep from "../../lib/cli/deps/lodash.clonedeep.js";
import merge from "lodash.merge";
import getAst from "../../lib/cli/vite-plugin/get-ast.js";
import type { ParsedStoriesResult } from "../../lib/shared/types";

export const parseWithFn = (
  code: string,
  input: Partial<ParsedStoriesResult>,
  fn: any,
  visitor: string,
  filename = "foo.stories.js",
): ParsedStoriesResult => {
  const start: ParsedStoriesResult = merge(
    {
      entry: "file.js",
      stories: [],
      exportDefaultProps: { title: undefined, meta: undefined },
      namedExportToMeta: {},
      namedExportToStoryName: {},
      storyParams: {},
      fileId: "file",
    },
    input,
  );
  const end: ParsedStoriesResult = cloneDeep(start);
  (traverse as any)(getAst(code, filename) as any, {
    [visitor]: fn.bind(this, end),
  });
  return end;
};

export const getOutput = (
  input: Partial<ParsedStoriesResult>,
): ParsedStoriesResult => {
  return merge(
    {
      entry: "file.js",
      stories: [],
      exportDefaultProps: { title: undefined, meta: undefined },
      namedExportToMeta: {},
      namedExportToStoryName: {},
      storyParams: {},
      fileId: "file",
    },
    input,
  );
};
