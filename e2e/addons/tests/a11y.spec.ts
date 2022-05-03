import { test, expect } from "@playwright/test";

test("boolean control works", async ({ page }) => {
  await page.goto("http://localhost:61100/?story=a11y--issues");
  const button = await page.locator('[data-testid="addon-a11y"]');
  await button.click();
  await expect(page.locator('[data-testid="ladle-dialog"]')).toContainText(
    "There are 3 axe accessibility violationsElements must have sufficient color contrast (1). Show detailsImages must have alternate text (1). Show detailsForm elements must have labels (1). Show details",
  );
});
