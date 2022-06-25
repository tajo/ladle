import { test, expect } from "@playwright/test";

test("Axe detects violations", async ({ page }) => {
  await page.goto("http://localhost:61100/?story=a11y--issues");
  const button = await page.locator('[data-testid="addon-a11y"]');
  await button.click();
  await expect(page.locator('[data-testid="ladle-dialog"]')).toContainText(
    "accessibility violations",
  );
});
