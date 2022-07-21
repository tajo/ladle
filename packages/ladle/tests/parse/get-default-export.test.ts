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
