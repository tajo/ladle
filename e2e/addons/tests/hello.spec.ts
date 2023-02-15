import { test, expect } from "@playwright/test";

test("navigate to a different story through useLink", async ({ page }) => {
  await page.goto("http://localhost:61100/?story=hello--world");
  const button = await page.locator("#btn");
  await button.click();
  await expect(page.locator("h2")).toHaveText("Linked Story");
});

test("useLadleContext works", async ({ page }) => {
  await page.goto("http://localhost:61100?story=hello--world");
  await expect(page.locator("#context-div")).toHaveText(
    `{"theme":"light","mode":"full","story":"hello--world","rtl":false,"source":false,"width":0,"control":{},"action":[],"controlInitialized":true}`,
  );
});
