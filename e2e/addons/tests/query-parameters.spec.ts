import { test, expect } from "@playwright/test";

test("remain non-ladle query parameters", async ({ page }) => {
  await page.goto("/?story=query--parameters");
  const url = page.url();
  expect(url.includes("story=query--parameters"));
  expect(url.includes("foo=bar"));
});
