import { expect, test } from "@playwright/test";

test("Story meta is available in provider", async ({ page }) => {
  await page.goto("/?story=meta--story-meta");
  await expect(page.locator("#myMeta")).toHaveText("This is my meta");
});
