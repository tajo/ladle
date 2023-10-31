import { test, expect } from "@playwright/test";

test("default title is used when creating story ids", async ({ page }) => {
  await page.goto("/?story=root--examples--first");
  await expect(page.locator("main")).toHaveText("first");
});

test("storyName is used when creating story ids", async ({ page }) => {
  await page.goto("/?story=root--examples--second-renamed");
  await expect(page.locator("main")).toHaveText("second");
});

test("meta.json is correctly using defaults and overrides", async ({
  request,
}) => {
  const meta = await request.get("http://127.0.0.1:61103/meta.json");
  expect(await meta.json()).toEqual(
    expect.objectContaining({
      about: {
        github: "https://github.com/tajo/ladle",
        homepage: "https://www.ladle.dev",
        version: 1,
      },
      stories: {
        "args--card-hello": {
          filePath: "src/args.stories.tsx",
          levels: ["Args"],
          locEnd: 44,
          locStart: 44,
          meta: {},
          name: "Card hello",
          namedExport: "CardHello",
        },
        "hello--world": {
          filePath: "src/hello.stories.tsx",
          levels: ["Hello"],
          locEnd: 20,
          locStart: 18,
          meta: {},
          name: "World",
          namedExport: "World",
        },
        "legacy-params--world": {
          filePath: "src/legacy-params.stories.tsx",
          levels: ["Legacy params"],
          locEnd: 39,
          locStart: 37,
          meta: {},
          name: "World",
          namedExport: "World",
        },
        "mock-date--active": {
          filePath: "src/mock-date.stories.tsx",
          levels: ["Mock date"],
          locEnd: 15,
          locStart: 3,
          meta: {
            mockDate: "1995-12-17T03:24:00",
          },
          name: "Active",
          namedExport: "Active",
        },
        "mock-date--inactive": {
          filePath: "src/mock-date.stories.tsx",
          levels: ["Mock date"],
          locEnd: 33,
          locStart: 21,
          meta: {},
          name: "Inactive",
          namedExport: "Inactive",
        },
        "root--examples--first": {
          filePath: "src/params.stories.tsx",
          levels: ["Root", "Examples"],
          locEnd: 13,
          locStart: 11,
          meta: { drink: "coke", food: "burger" },
          name: "First",
          namedExport: "First",
        },
        "root--examples--second-renamed": {
          filePath: "src/params.stories.tsx",
          levels: ["Root", "Examples"],
          locEnd: 17,
          locStart: 15,
          meta: { drink: "water", food: "burger" },
          name: "Second renamed",
          namedExport: "Second",
        },
      },
    }),
  );
});
