import getStorynameAndParameters from "../../lib/cli/snowpack-plugin/parse/get-storyname-and-parameters.js";
import { parseWithFn, getOutput } from "./utils";

test("No storyName or parameters", async () => {
  expect(
    parseWithFn(`export default {}`, {}, getStorynameAndParameters, "Program")
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
      getStorynameAndParameters,
      "Program"
    )
  ).toEqual(
    getOutput({
      namedExportToStoryName: {
        storyA: "storyRenamedA",
        storyB: "storyRenamedB",
      },
    })
  );
});

test("Parameters defined", async () => {
  expect(
    parseWithFn(
      `
const storyA = null;
storyA.parameters = {
  foo: true,
  baz: 'omg'
};
const storyB = null;
storyB.parameters = {
  foo: false
};
`,
      {},
      getStorynameAndParameters,
      "Program"
    )
  ).toEqual(
    getOutput({
      namedExportToParameters: {
        storyA: {
          baz: "omg",
          foo: true,
        },
        storyB: {
          foo: false,
        },
      },
    })
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
      getStorynameAndParameters,
      "Program"
    )
  ).toThrow(`storyA.storyName in file.js must be a string literal.`);
});

test("Parameters must be an ObjectExpression", async () => {
  expect(() =>
    parseWithFn(
      `
const storyA = null;
storyA.parameters = true;
`,
      {},
      getStorynameAndParameters,
      "Program"
    )
  ).toThrow(`storyA.parameters in file.js must be an object expression.`);
});

test("Parameters must be serializable.", async () => {
  expect(() =>
    parseWithFn(
      `
const storyA = null;
storyA.parameters = {
  foo: () => null
};
`,
      {},
      getStorynameAndParameters,
      "Program"
    )
  ).toThrow(`storyA.parameters in file.js must be serializable.`);
});
