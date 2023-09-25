import { test, expect } from "@playwright/test";

test("global argTypes and args exist", async ({ page }) => {
  await page.goto("/?story=hello--linked");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  //await page.check("#cities-Prague");
  await expect(page.locator(".ladle-controls-table")).toContainText(
    "Main backgroundPurple funbluewhitepinktest",
  );
});

test("change background color", async ({ page }) => {
  await page.goto("/?story=hello--linked");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.check("#background-pink");

  const bgDiv = page.locator(".ladle-background");
  const color = await bgDiv.evaluate((e: any) => {
    return window.getComputedStyle(e).getPropertyValue("background-color");
  });
  // pink color
  expect(color).toBe("rgb(255, 192, 203)");
});
