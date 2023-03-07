import { test, expect } from "@playwright/test";

test("custom path story is rendered", async ({ page }) => {
  await page.goto("http://127.0.0.1:61107/?story=specific-file--custom");

  await expect(page.locator("h1")).toHaveText("Custom path");
});
