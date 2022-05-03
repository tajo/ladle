import { test, expect } from "@playwright/test";

test("provider passes context and renders wrapper", async ({ page }) => {
  await page.goto("http://localhost:61105");
  await expect(page.locator("h1")).toHaveText("Hello World");
});

test("meta.json has a single story ok", async ({ request }) => {
  const meta = await request.get("http://localhost:61105/meta.json");
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
          locEnd: 3,
          locStart: 1,
          filePath: "src/hello.stories.tsx",
          meta: {},
        },
      },
    }),
  );
});
