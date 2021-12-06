import { test, expect } from "@playwright/test";

test("provider passes context and renders wrapper", async ({ page }) => {
  await page.goto("http://localhost:61000");
  await expect(page.locator("h1")).toHaveText("Hello World - some-context");
  await expect(page.locator("p")).toHaveText("rendered by provider");
});

test("meta.json has a single story ok", async ({ request }) => {
  const meta = await request.get("http://localhost:61000/meta.json");
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
          locEnd: 7,
          locStart: 4,
          filePath: "src/hello.stories.tsx",
          meta: {},
        },
      },
    }),
  );
});
