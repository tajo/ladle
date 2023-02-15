import { test, expect } from "@playwright/test";

test("default story is rendered", async ({ page }) => {
  await page.goto("http://localhost:61109?story=hello--world");
  await expect(page.locator("h1")).toHaveText("Hello World");
});

test("useLadleContext works", async ({ page }) => {
  await page.goto("http://localhost:61109?story=hello--world");
  await expect(page.locator("#context-div")).toHaveText(
    `{"theme":"light","mode":"full","story":"hello--world","rtl":false,"source":false,"width":0,"control":{},"action":[],"controlInitialized":true}`,
  );
});
