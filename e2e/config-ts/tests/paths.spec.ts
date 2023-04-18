import { expect, test } from "@playwright/test";

test("vite-tsconfig-path works", async ({ page }) => {
  await page.goto("/?story=paths--path");
  await expect(page.locator("h1")).toHaveText("label");
});
