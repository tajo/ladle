import { test, expect } from "@playwright/test";

test("default story is rendered", async ({ page }) => {
  await page.goto("http://127.0.0.1:61107?story=hello--world");
  await expect(page.locator("h1")).toHaveText("Hello World");
});

test("navigation respects storyOrder from the .ladle/config.mjs", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:61107");
  await expect(page.locator("nav")).toHaveText("Specific fileHello");
});
