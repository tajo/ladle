import { getEntryData } from "../lib/cli/snowpack-plugin/parse/get-entry-data.js";
import getGeneratedList from "../lib/cli/snowpack-plugin/generate/get-generated-list.js";

test("Single file with two stories", async () => {
  const entryData = await getEntryData(["tests/fixtures/animals.stories.tsx"]);
  const list = getGeneratedList(entryData);
  expect(list).toMatchSnapshot();
});

test("Capital letters in story names converted into delimiters", async () => {
  const entryData = await getEntryData([
    "tests/fixtures/capitalization.stories.tsx",
  ]);
  const list = getGeneratedList(entryData);
  expect(list).toMatchSnapshot();
});

test("Capital letters in the filename converted into delimiters", async () => {
  const entryData = await getEntryData([
    "tests/fixtures/filenameCapitalization.stories.tsx",
  ]);
  const list = getGeneratedList(entryData);
  expect(list).toMatchSnapshot();
});

test("Turn file name delimiters into spaces and levels correctly", async () => {
  const entryData = await getEntryData([
    "tests/fixtures/our-animals--mammals.stories.tsx",
  ]);
  const list = getGeneratedList(entryData);
  expect(list).toMatchSnapshot();
});

test("Default title is used instead of the file name", async () => {
  const entryData = await getEntryData([
    "tests/fixtures/default-title.stories.tsx",
  ]);
  const list = getGeneratedList(entryData);
  expect(list).toMatchSnapshot();
});

test("Story name replaces named export as a story name", async () => {
  const entryData = await getEntryData([
    "tests/fixtures/storyname.stories.tsx",
  ]);
  const list = getGeneratedList(entryData);
  expect(list).toMatchSnapshot();
});

test("Extract default parameters", async () => {
  const entryData = await getEntryData([
    "tests/fixtures/default-parameters.stories.tsx",
  ]);
  const list = getGeneratedList(entryData);
  expect(list).toMatchSnapshot();
});

test("Extract and merge story parameters", async () => {
  const entryData = await getEntryData([
    "tests/fixtures/story-parameters.stories.tsx",
  ]);
  const list = getGeneratedList(entryData);
  expect(list).toMatchSnapshot();
});
