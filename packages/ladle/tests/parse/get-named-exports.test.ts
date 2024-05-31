import { test, expect } from "vitest";
import getNamedExports from "../../lib/cli/vite-plugin/parse/get-named-exports.js";
import { parseWithFn, getOutput } from "./utils";

test("No named exports", async () => {
  expect(
    parseWithFn(
      `export default {}`,
      {},
      getNamedExports,
      "ExportNamedDeclaration",
    ),
  ).toEqual(getOutput({}));
});

test("Basic named exports", async () => {
  expect(
    parseWithFn(
      `export const MyStory = () => null;
       export const Ha = () => null;
      `,
      {},
      getNamedExports,
      "ExportNamedDeclaration",
    ),
  ).toEqual(
    getOutput({
      stories: [
        {
          componentName: "file$$my$story",
          namedExport: "MyStory",
          storyId: "file--my-story",
          locEnd: 1,
          locStart: 1,
        },
        {
          componentName: "file$$ha",
          locEnd: 2,
          locStart: 2,
          namedExport: "Ha",
          storyId: "file--ha",
        },
      ],
    }),
  );
});

test("Basic named exports in typescript", async () => {
  expect(
    parseWithFn(
      `export const MyStory = () => null;`,
      {},
      getNamedExports,
      "ExportNamedDeclaration",
      "foo.tsx",
    ),
  ).toEqual(
    getOutput({
      stories: [
        {
          componentName: "file$$my$story",
          namedExport: "MyStory",
          storyId: "file--my-story",
          locEnd: 1,
          locStart: 1,
        },
      ],
    }),
  );
});

test("Named export renamed through storyNames", async () => {
  expect(
    parseWithFn(
      `export const MyStory = () => null;`,
      {
        namedExportToStoryName: {
          MyStory: "RenamedStory",
        },
      },
      getNamedExports,
      "ExportNamedDeclaration",
    ),
  ).toEqual(
    getOutput({
      namedExportToStoryName: {
        MyStory: "RenamedStory",
      },
      stories: [
        {
          componentName: "file$$renamed$story",
          namedExport: "MyStory",
          storyId: "file--renamed-story",
          locEnd: 1,
          locStart: 1,
        },
      ],
    }),
  );
});

test("Named export with added story meta", async () => {
  expect(
    parseWithFn(
      `export const MyStory = () => null;`,
      {
        namedExportToMeta: {
          MyStory: {
            flag: true,
          },
        },
      },
      getNamedExports,
      "ExportNamedDeclaration",
    ),
  ).toEqual(
    getOutput({
      namedExportToMeta: {
        MyStory: {
          flag: true,
        },
      },
      storyParams: {
        "file--my-story": {
          meta: {
            flag: true,
          },
        },
      },
      stories: [
        {
          componentName: "file$$my$story",
          namedExport: "MyStory",
          storyId: "file--my-story",
          locEnd: 1,
          locStart: 1,
        },
      ],
    }),
  );
});

test("Named export with added default meta", async () => {
  expect(
    parseWithFn(
      `export const MyStory = () => null;`,
      {
        exportDefaultProps: {
          meta: {
            flag: true,
          },
        },
      },
      getNamedExports,
      "ExportNamedDeclaration",
    ),
  ).toEqual(
    getOutput({
      exportDefaultProps: {
        meta: {
          flag: true,
        },
      },
      storyParams: {
        "file--my-story": {
          meta: {
            flag: true,
          },
        },
      },
      stories: [
        {
          componentName: "file$$my$story",
          namedExport: "MyStory",
          storyId: "file--my-story",
          locEnd: 1,
          locStart: 1,
        },
      ],
    }),
  );
});

test("Named export with added default and story meta", async () => {
  expect(
    parseWithFn(
      `export const MyStory = () => null;`,
      {
        exportDefaultProps: {
          meta: {
            flag: true,
            color: "red",
          },
        },
        namedExportToMeta: {
          MyStory: {
            flag: false,
            browser: "chrome",
          },
        },
      },
      getNamedExports,
      "ExportNamedDeclaration",
    ),
  ).toEqual(
    getOutput({
      exportDefaultProps: {
        meta: {
          flag: true,
          color: "red",
        },
      },
      namedExportToMeta: {
        MyStory: {
          flag: false,
          browser: "chrome",
        },
      },
      storyParams: {
        "file--my-story": {
          meta: {
            browser: "chrome",
            color: "red",
            flag: false,
          },
        },
      },
      stories: [
        {
          componentName: "file$$my$story",
          namedExport: "MyStory",
          storyId: "file--my-story",
          locEnd: 1,
          locStart: 1,
        },
      ],
    }),
  );
});

test("Class Named Export", async () => {
  expect(
    parseWithFn(
      `export class MyClassStory extends React.Component { }`,
      {},
      getNamedExports,
      "ExportNamedDeclaration",
    ),
  ).toEqual(
    getOutput({
      stories: [
        {
          componentName: "file$$my$class$story",
          namedExport: "MyClassStory",
          storyId: "file--my-class-story",
          locEnd: 1,
          locStart: 1,
        },
      ],
    }),
  );
});

test("Function Named Export", async () => {
  expect(
    parseWithFn(
      `export function FunctionStory() { }`,
      {},
      getNamedExports,
      "ExportNamedDeclaration",
    ),
  ).toEqual(
    getOutput({
      stories: [
        {
          componentName: "file$$function$story",
          namedExport: "FunctionStory",
          storyId: "file--function-story",
          locEnd: 1,
          locStart: 1,
        },
      ],
    }),
  );
});

test("Export Block", async () => {
  expect(
    parseWithFn(
      `var myStory = () => "Text";
export { 
  myStory, 
  myStory as renamed 
};`,
      {},
      getNamedExports,
      "ExportNamedDeclaration",
    ),
  ).toEqual(
    getOutput({
      stories: [
        {
          componentName: "file$$my$story",
          namedExport: "myStory",
          storyId: "file--my-story",
          locEnd: 3,
          locStart: 3,
        },
        {
          componentName: "file$$renamed",
          namedExport: "renamed",
          storyId: "file--renamed",
          locEnd: 4,
          locStart: 4,
        },
      ],
    }),
  );
});
