import { test, expect } from "vitest";
import getDefaultExport from "../../lib/cli/vite-plugin/parse/get-default-export.js";
import { parseWithFn, getOutput } from "./utils";

test("No default export", async () => {
  expect(
    parseWithFn(
      `const haha = true;`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration",
    ),
  ).toEqual(
    getOutput({
      exportDefaultProps: { title: undefined, meta: undefined },
    }),
  );
});

test("Get default export title", async () => {
  expect(
    parseWithFn(
      `export default { title: 'Title'}`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration",
    ),
  ).toEqual(
    getOutput({
      exportDefaultProps: { title: "Title", meta: undefined },
    }),
  );
});

test("Get default export meta", async () => {
  expect(
    parseWithFn(
      `export default { meta: { some: 'foo', flag: true } }`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration",
    ),
  ).toEqual(
    getOutput({
      exportDefaultProps: {
        title: undefined,
        meta: { some: "foo", flag: true },
      },
    }),
  );
});

test("Get simple reference ", async () => {
  expect(
    parseWithFn(
      `const params = { meta: { some: 'foo', flag: true } }; export default params;`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration",
    ),
  ).toEqual(
    getOutput({
      exportDefaultProps: {
        title: undefined,
        meta: { some: "foo", flag: true },
      },
    }),
  );
});

test("Throw an error if default export is not serializable", async () => {
  expect(() =>
    parseWithFn(
      `export default { title: () => true }`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration",
    ),
  ).toThrow(
    `Can't parse the default title and meta of file.js. Meta must be serializable and title a string literal.`,
  );
});

test("Get default export through named identifier with `satisfies`", async () => {
  // CSF v3 / Storybook style:
  //   const meta = { ... } satisfies Meta<typeof X>;
  //   export default meta;
  // Without the unwrap, `objNode` lands on the TSSatisfiesExpression
  // (whose `.properties` is undefined), so title and meta silently never
  // reach the result.
  expect(
    parseWithFn(
      `const meta = { title: 'Title', meta: { some: 'foo' } } satisfies SomeType;
       export default meta;`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration",
      "foo.stories.tsx",
    ),
  ).toEqual(
    getOutput({
      exportDefaultProps: { title: "Title", meta: { some: "foo" } },
    }),
  );
});

test("Get default export through named identifier with `as`", async () => {
  expect(
    parseWithFn(
      `const meta = { title: 'Title', meta: { flag: true } } as SomeType;
       export default meta;`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration",
      "foo.stories.tsx",
    ),
  ).toEqual(
    getOutput({
      exportDefaultProps: { title: "Title", meta: { flag: true } },
    }),
  );
});
