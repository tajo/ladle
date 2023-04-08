import { test, expect } from "@playwright/test";

test("css, css modules and postcss are loaded correctly", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCSS(
    "background-color",
    "rgb(255, 255, 0)",
  );
  await expect(page.locator("h2")).toHaveCSS("color", "rgb(255, 0, 0)");
  await expect(page.locator("h3")).toHaveCSS("font-size", "36px");
});
