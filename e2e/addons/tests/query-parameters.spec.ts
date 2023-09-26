import { test, expect } from "@playwright/test";

test.only("remain non-ladle query parameters", async ({ page }) => {
  await page.goto("/?story=query-parameters--query-parameters");
  await page.waitForSelector("[data-storyloaded]");
  const url = page.url();
  expect(url).toContain("story=query-parameters--query-parameters");
  expect(url).toContain("foo=bar");
});
