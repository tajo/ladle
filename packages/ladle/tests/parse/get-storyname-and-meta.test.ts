import { test, expect } from "vitest";
import getStorynameAndMeta from "../../lib/cli/vite-plugin/parse/get-storyname-and-meta.js";
import { parseWithFn, getOutput } from "./utils";

test("No storyName or meta", async () => {
  expect(
    parseWithFn(`export default {}`, {}, getStorynameAndMeta, "Program"),
  ).toEqual(getOutput({}));
});

test("Storynames defined", async () => {
  expect(
    parseWithFn(
      `
const storyA = null;
storyA.storyName = 'storyRenamedA';
const storyB = null;
storyB.storyName = 'storyRenamedB';
`,
      {},
      getStorynameAndMeta,
      "Program",
    ),
  ).toEqual(
    getOutput({
      namedExportToStoryName: {
        storyA: "storyRenamedA",
        storyB: "storyRenamedB",
      },
    }),
  );
});

test("Meta defined", async () => {
  expect(
    parseWithFn(
      `
const storyA = null;
storyA.meta = {
  foo: true,
  baz: 'omg'
};
const storyB = null;
storyB.meta = {
  foo: false
};
`,
      {},
      getStorynameAndMeta,
      "Program",
    ),
  ).toEqual(
    getOutput({
      namedExportToMeta: {
        storyA: {
          baz: "omg",
          foo: true,
        },
        storyB: {
          foo: false,
        },
      },
    }),
  );
});

test("Storynames must be string", async () => {
  expect(() =>
    parseWithFn(
      `
const storyA = null;
storyA.storyName = true;
`,
      {},
      getStorynameAndMeta,
      "Program",
    ),
  ).toThrow(`storyA.storyName in file.js must be a string literal.`);
});

test("Meta must be an ObjectExpression", async () => {
  expect(() =>
    parseWithFn(
      `
const storyA = null;
storyA.meta = true;
`,
      {},
      getStorynameAndMeta,
      "Program",
    ),
  ).toThrow(`storyA.meta in file.js must be an object expression.`);
});

test("Meta must be serializable.", async () => {
  expect(() =>
    parseWithFn(
      `
const storyA = null;
storyA.meta = {
  foo: () => null
};
`,
      {},
      getStorynameAndMeta,
      "Program",
    ),
  ).toThrow(`storyA.meta in file.js must be serializable.`);
});
