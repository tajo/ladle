import { expect, test } from "@playwright/test";

test("Story meta is available in provider", async ({ page }) => {
  await page.goto("http://127.0.0.1:61106/?story=meta--story-meta");
  await expect(page.locator("#myMeta")).toHaveText("This is my meta");
});
