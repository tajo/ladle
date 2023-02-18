import { test, expect } from "@playwright/test";

test("Provider passes context and renders wrapper", async ({ page }) => {
  await page.goto("http://localhost:61106/?story=hello--world");
  await expect(page.locator("h1")).toHaveText("Hello World - some-context");
  await expect(page.locator("p")).toHaveText("rendered by provider");
});

test("StorySourceHeader sets a custom source header", async ({ page }) => {
  await page.goto("http://localhost:61106/?story=hello--world");
  const button = await page.locator('[data-testid="addon-source"]');
  await button.click();
  await expect(page.locator("#source-header")).toContainText(
    "project/aaa/src/hello.stories.tsx5-8",
  );
});

test("meta.json has 3 stories", async ({ request }) => {
  const meta = await request.get("http://localhost:61106/meta.json");
  expect(await meta.json()).toEqual(
    expect.objectContaining({
      about: {
        github: "https://github.com/tajo/ladle",
        homepage: "https://www.ladle.dev",
        version: 1,
      },
      stories: {
        "hello--world": {
          filePath: "src/hello.stories.tsx",
          levels: ["Hello"],
          locEnd: 8,
          locStart: 5,
          meta: {},
          name: "World",
        },
        "hmr--with-state": {
          filePath: "src/hmr.stories.tsx",
          levels: ["Hmr"],
          locEnd: 8,
          locStart: 1,
          meta: {},
          name: "With state",
        },
        "meta--story-meta": {
          filePath: "src/meta.stories.tsx",
          levels: ["Meta"],
          locEnd: 5,
          locStart: 3,
          meta: { myMeta: "This is my meta" },
          name: "Story meta",
        },
      },
    }),
  );
});
