import { test, expect } from "@playwright/test";

test("provider passes context and renders wrapper", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveText("Hello World");
});

test("meta.json has a single story ok", async ({ request }) => {
  const meta = await request.get("http://127.0.0.1:61105/meta.json");
  expect(await meta.json()).toEqual(
    expect.objectContaining({
      about: {
        homepage: "https://www.ladle.dev",
        github: "https://github.com/tajo/ladle",
        version: 1,
      },
      stories: {
        "hello--world": {
          name: "World",
          levels: ["Hello"],
          locStart: 3,
          locEnd: 5,
          filePath: "src/hello.stories.tsx",
          meta: {},
          namedExport: "World",
        },
        "hello--ayo": {
          filePath: "src/hello.stories.tsx",
          levels: ["Hello"],
          locEnd: 9,
          locStart: 7,
          meta: {},
          name: "Ayo",
          namedExport: "Ayo",
        },
      },
    }),
  );
});

test("navigation respects storyOrder from the programatic API", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("nav")).toHaveText("HelloWorldAyo");
});
