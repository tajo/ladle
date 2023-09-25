import { test, expect } from "@playwright/test";

test("action passed through argTypes", async ({ page }) => {
  await page.goto("/?story=action--basic");
  const userButton = page.locator("#args-button");
  await userButton.click();
  const button = page.locator('[data-testid="addon-action"]');
  await button.click();
  await expect(page.locator(".ladle-addon-modal-body")).toContainText(
    "onClick",
  );
});

test("dynamic action", async ({ page }) => {
  await page.goto("/?story=action--basic");
  const userButton = page.locator("#manual-button");
  await userButton.click();
  const button = page.locator('[data-testid="addon-action"]');
  await button.click();
  await expect(page.locator(".ladle-addon-modal-body")).toContainText("second");
});
