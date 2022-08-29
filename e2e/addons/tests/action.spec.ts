import { test, expect } from "@playwright/test";

test("action passed through argTypes", async ({ page }) => {
  await page.goto("http://localhost:61100/?story=action--basic");
  const userButton = await page.locator("#args-button");
  await userButton.click();
  const button = await page.locator('[data-testid="addon-action"]');
  await button.click();
  await expect(page.locator(".ladle-addon-modal-body")).toContainText(
    "onClick",
  );
});

test("dynamic action", async ({ page }) => {
  await page.goto("http://localhost:61100/?story=action--basic");
  const userButton = await page.locator("#manual-button");
  await userButton.click();
  const button = await page.locator('[data-testid="addon-action"]');
  await button.click();
  await expect(page.locator(".ladle-addon-modal-body")).toContainText("second");
});
