import { test, expect } from "vitest";
import { VFile } from "vfile";
import { createFormatAwareProcessors } from "@mdx-js/mdx/internal-create-format-aware-processors";
import mdxToStories from "../lib/cli/vite-plugin/mdx-to-stories.js";
import fs from "fs/promises";

const { process } = createFormatAwareProcessors({
  jsx: true,
});

const getFixture = async (path: string) => {
  const value = await fs.readFile(new URL(path, import.meta.url), {
    encoding: "utf8",
  });
  const file = new VFile({ value, path });
  const compiled = await process(file);
  return [String(compiled.value), path];
};

test("<Story /> component works", async () => {
  const fixture = await getFixture("./fixtures/story.stories.mdx");
  const output = await mdxToStories(...fixture);
  expect(output).toMatchSnapshot();
});

test("<Meta /> component works", async () => {
  const fixture = await getFixture("./fixtures/meta.stories.mdx");
  const output = await mdxToStories(...fixture);
  expect(output).toMatchSnapshot();
});
