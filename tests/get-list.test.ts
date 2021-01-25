import { getList } from "../lib/cli/snowpack-plugin/get-list";
import path from "path";
const appSrcDir = path.join(process.cwd(), "dist/app/src");

test("Single file with two stories", async () => {
  expect(
    (await getList(["./tests/fixtures/animals.stories.tsx"], appSrcDir))[0]
  ).toMatchSnapshot();
});

test("Capital letters in story names converted into delimiters", async () => {
  expect(
    (
      await getList(["./tests/fixtures/capitalization.stories.tsx"], appSrcDir)
    )[0]
  ).toMatchSnapshot();
});

test("Capital letters in the filename converted into delimiters", async () => {
  expect(
    (
      await getList(
        ["./tests/fixtures/filenameCapitalization.stories.tsx"],
        appSrcDir
      )
    )[0]
  ).toMatchSnapshot();
});

test("Turn file name delimiters into spaces and levels correctly", async () => {
  expect(
    (
      await getList(
        ["./tests/fixtures/our-animals--mammals.stories.tsx"],
        appSrcDir
      )
    )[0]
  ).toMatchSnapshot();
});

test("Default title is used instead of the file name", async () => {
  expect(
    (
      await getList(["./tests/fixtures/default-title.stories.tsx"], appSrcDir)
    )[0]
  ).toMatchSnapshot();
});

test("Story name replaces named export as a story name", async () => {
  expect(
    (await getList(["./tests/fixtures/storyname.stories.tsx"], appSrcDir))[0]
  ).toMatchSnapshot();
});

test("Extract default parameters", async () => {
  expect(
    (
      await getList(
        ["./tests/fixtures/default-parameters.stories.tsx"],
        appSrcDir
      )
    )[0]
  ).toMatchSnapshot();
});

test("Extract and merge story parameters", async () => {
  expect(
    (
      await getList(
        ["./tests/fixtures/story-parameters.stories.tsx"],
        appSrcDir
      )
    )[0]
  ).toMatchSnapshot();
});
