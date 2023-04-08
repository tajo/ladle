import { test, expect } from "@playwright/test";

test("custom path story is rendered", async ({ page }) => {
  await page.goto("/?story=specific-file--custom");

  await expect(page.locator("h1")).toHaveText("Custom path");
});
