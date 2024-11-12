import { test, expect } from "@playwright/test";

test("default story is rendered", async ({ page }) => {
  await page.goto("/?story=hello--world");
  await expect(page.locator("h1")).toHaveText("Hello World");
});

test("navigation respects storyOrder from the .ladle/config.mjs", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("nav")).toHaveText(
    "Specific fileCustomHelloStylesWorld",
  );
});
