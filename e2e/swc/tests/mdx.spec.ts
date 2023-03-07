import { test, expect } from "@playwright/test";

test("mdx story is rendered", async ({ page }) => {
  await page.goto("http://127.0.0.1:61109?story=mdx--first");
  await expect(page.locator("main button")).toHaveText("simple");
});
