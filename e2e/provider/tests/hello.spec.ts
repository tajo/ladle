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
  expect(Object.keys((await meta.json()).stories).length).toEqual(3);
});
