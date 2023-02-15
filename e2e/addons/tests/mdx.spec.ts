import { test, expect } from "@playwright/test";

test("mdx story is rendered", async ({ page }) => {
  await page.goto("http://localhost:61100?story=mdx--first");
  await expect(page.locator("main button")).toHaveText("simple");
});
