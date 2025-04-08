import { test, expect } from "@playwright/test";

test("a11y addon works", async ({ page }) => {
  await page.goto("/?story=a11y--issues");
  await page.waitForSelector("[data-storyloaded]");
  const button = page.locator('[data-testid="addon-a11y"]');
  await button.click();
  await expect(page.locator('[data-testid="ladle-dialog"]')).toContainText(
    "There are 3 axe accessibility violationsElements must meet minimum color contrast ratio thresholds (1). Show detailsImages must have alternative text (1). Show detailsForm elements must have labels (1). Show details",
  );
});
