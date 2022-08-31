import { test, expect } from "vitest";
import { getSingleEntry } from "../../lib/cli/vite-plugin/parse/get-entry-data.js";

test("Single file with two stories", async () => {
  const entryData = await getSingleEntry("tests/fixtures/animals.stories.tsx");
  expect(entryData).toMatchSnapshot();
});

test("Capital letters in story names converted into delimiters", async () => {
  const entryData = await getSingleEntry(
    "tests/fixtures/capitalization.stories.tsx",
  );
  expect(entryData).toMatchSnapshot();
});

test("Capital letters in the filename converted into delimiters", async () => {
  const entryData = await getSingleEntry(
    "tests/fixtures/filenameCapitalization.stories.tsx",
  );
  expect(entryData).toMatchSnapshot();
});

test("Turn file name delimiters into spaces and levels correctly", async () => {
  const entryData = await getSingleEntry(
    "tests/fixtures/our-animals--mammals.stories.tsx",
  );
  expect(entryData).toMatchSnapshot();
});

test("Default title is used instead of the file name", async () => {
  const entryData = await getSingleEntry(
    "tests/fixtures/default-title.stories.tsx",
  );
  expect(entryData).toMatchSnapshot();
});

test("Story name replaces named export as a story name", async () => {
  const entryData = await getSingleEntry(
    "tests/fixtures/storyname.stories.tsx",
  );
  expect(entryData).toMatchSnapshot();
});

test("Extract default meta", async () => {
  const entryData = await getSingleEntry(
    "tests/fixtures/default-meta.stories.tsx",
  );
  expect(entryData).toMatchSnapshot();
});

test("Extract and merge story meta", async () => {
  const entryData = await getSingleEntry(
    "tests/fixtures/story-meta.stories.tsx",
  );
  expect(entryData).toMatchSnapshot();
});
