import getDefaultExport from "../../lib/cli/snowpack-plugin/parse/get-default-export.js";
import { parseWithFn, getOutput } from "./utils";

test("No default export", async () => {
  expect(
    parseWithFn(
      `const haha = true;`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration"
    )
  ).toEqual(
    getOutput({
      exportDefaultProps: { title: undefined, parameters: undefined },
    })
  );
});

test("Get default export title", async () => {
  expect(
    parseWithFn(
      `export default { title: 'Title'}`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration"
    )
  ).toEqual(
    getOutput({ exportDefaultProps: { title: "Title", parameters: undefined } })
  );
});

test("Get default export parameters", async () => {
  expect(
    parseWithFn(
      `export default { parameters: { some: 'foo', flag: true } }`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration"
    )
  ).toEqual(
    getOutput({
      exportDefaultProps: {
        title: undefined,
        parameters: { some: "foo", flag: true },
      },
    })
  );
});

test("Get simple refference ", async () => {
  expect(
    parseWithFn(
      `const params = { parameters: { some: 'foo', flag: true } }; export default params;`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration"
    )
  ).toEqual(
    getOutput({
      exportDefaultProps: {
        title: undefined,
        parameters: { some: "foo", flag: true },
      },
    })
  );
});

test("Throw an error if default export is not serializable", async () => {
  expect(() =>
    parseWithFn(
      `export default { title: () => true }`,
      {},
      getDefaultExport,
      "ExportDefaultDeclaration"
    )
  ).toThrow(
    `Can't parse the default export of file.js. It must be serializable.`
  );
});
