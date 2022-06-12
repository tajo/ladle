import { test, expect } from "@playwright/test";

test("default story is rendered", async ({ page }) => {
  await page.goto("http://localhost:61107");
  await expect(page.locator("h1")).toHaveText("Hello World");
});
