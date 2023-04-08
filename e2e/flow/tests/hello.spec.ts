import { test, expect } from "@playwright/test";

test("Flow types work with enableFlow: true", async ({ page }) => {
  await page.goto("/?story=hello--world");
  await expect(page.locator("main")).toHaveText("Flow Button");
});
