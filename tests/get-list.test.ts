import { getList } from "../lib/cli/ast/get-list";

test("Single file with two stories", async () => {
  expect(
    await getList(["./tests/fixtures/animals.stories.tsx"])
  ).toMatchSnapshot();
});

test("Capital letters in story names converted into delimiters", async () => {
  expect(
    await getList(["./tests/fixtures/capitalization.stories.tsx"])
  ).toMatchSnapshot();
});

test("Capital letters in the filename converted into delimiters", async () => {
  expect(
    await getList(["./tests/fixtures/filenameCapitalization.stories.tsx"])
  ).toMatchSnapshot();
});

test("Turn file name delimiters into spaces and levels correctly", async () => {
  expect(
    await getList(["./tests/fixtures/our-animals--mammals.stories.tsx"])
  ).toMatchSnapshot();
});

test("Default title is used instead of the file name", async () => {
  expect(
    await getList(["./tests/fixtures/default-title.stories.tsx"])
  ).toMatchSnapshot();
});

test("Story name replaces named export as a story name", async () => {
  expect(
    await getList(["./tests/fixtures/storyname.stories.tsx"])
  ).toMatchSnapshot();
});

test("Extract default parameters", async () => {
  expect(
    await getList(["./tests/fixtures/default-parameters.stories.tsx"])
  ).toMatchSnapshot();
});
