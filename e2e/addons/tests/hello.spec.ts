import { test, expect } from "@playwright/test";

test("navigate to a different story through useLink", async ({ page }) => {
  await page.goto("http://localhost:61100/?story=hello--world");
  const button = await page.locator("#btn");
  await button.click();
  await expect(page.locator("h2")).toHaveText("Linked Story");
});
