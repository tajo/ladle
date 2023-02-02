import { test, expect } from "@playwright/test";

test("default title is used when creating story ids", async ({ page }) => {
  await page.goto("http://localhost:61103/?story=root--examples--first");
  await expect(page.locator("main")).toHaveText("first");
});

test("storyName is used when creating story ids", async ({ page }) => {
  await page.goto(
    "http://localhost:61103/?story=root--examples--second-renamed",
  );
  await expect(page.locator("main")).toHaveText("second");
});

test("meta.json is correctly using defaults and overrides", async ({
  request,
}) => {
  const meta = await request.get("http://localhost:61103/meta.json");
  expect(await meta.json()).toEqual(
    expect.objectContaining({
      about: {
        homepage: "https://www.ladle.dev",
        github: "https://github.com/tajo/ladle",
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
        },
        "hello--world": {
          name: "World",
          levels: ["Hello"],
          locStart: 16,
          locEnd: 18,
          filePath: "src/hello.stories.tsx",
          meta: {},
        },
        "root--examples--first": {
          name: "First",
          levels: ["Root", "Examples"],
          locStart: 9,
          locEnd: 11,
          filePath: "src/params.stories.tsx",
          meta: { drink: "coke", food: "burger" },
        },
        "root--examples--second-renamed": {
          name: "Second renamed",
          levels: ["Root", "Examples"],
          locStart: 13,
          locEnd: 15,
          filePath: "src/params.stories.tsx",
          meta: { drink: "water", food: "burger" },
        },
      },
    }),
  );
});
