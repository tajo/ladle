import traverse from "@babel/traverse";
import merge from "lodash.merge";
import clonedeep from "lodash.clonedeep";
import getAst from "../../lib/cli/vite-plugin/get-ast.js";
import type { ParsedStoriesResult } from "../../lib/shared/types";

export const parseWithFn = (
  code: string,
  input: Partial<ParsedStoriesResult>,
  fn: any,
  visitor: string,
  filename: string = "foo.stories.js",
): ParsedStoriesResult => {
  const start: ParsedStoriesResult = merge(
    {
      entry: "file.js",
      stories: [],
      exportDefaultProps: { title: undefined, parameters: undefined },
      namedExportToParameters: {},
      namedExportToStoryName: {},
      storyParams: {},
      fileId: "file",
    },
    input,
  );
  const end: ParsedStoriesResult = clonedeep(start);
  traverse(getAst(code, filename), {
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
      exportDefaultProps: { title: undefined, parameters: undefined },
      namedExportToParameters: {},
      namedExportToStoryName: {},
      storyParams: {},
      fileId: "file",
    },
    input,
  );
};
