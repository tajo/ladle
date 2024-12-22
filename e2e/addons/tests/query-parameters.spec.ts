import { test, expect } from "@playwright/test";

test("when directly open the story, remain non-ladle query parameters", async ({
  page,
}) => {
  await page.goto("/?story=query-parameters--query-parameters");
  await page.waitForSelector("[data-storyloaded]");
  await page.waitForTimeout(1000);
  const url = page.url();
  expect(url).toContain("story=query-parameters--query-parameters");
  expect(url).toContain("foo=bar");
});

test("when click the menu and open the story, remain non-ladle query parameters", async ({
  page,
}) => {
  await page.goto("/?story=a11y--issues"); // Open a some story
  await page.getByText("Query parameters").click(); // Open the accordion of query parameters stories
  await page.getByRole("link", { name: "Query parameters" }).click(); // Open the target story
  await page.waitForSelector("[data-storyloaded]");
  await page.waitForTimeout(1000);
  const url = page.url();
  expect(url).toContain("story=query-parameters--query-parameters");
  expect(url).toContain("foo=bar");
});

test("when move a story from the query parameters story, remove non-ladle query parameters", async ({
  page,
}) => {
  // Open the query parameters story
  await page.goto("/?story=query-parameters--query-parameters");
  await page.waitForSelector("[data-storyloaded]");

  // Open a some story
  await page.getByText("A11y").click();
  await page.getByRole("link", { name: "Issues" }).click();
  await page.waitForSelector("[data-storyloaded]");
  await page.waitForTimeout(1000);
  const url = page.url();
  expect(url).toContain("story=a11y--issues");
  expect(url).not.toContain("foo=bar"); // The non-ladle query parameter is removed
});

test("preserve user query params after ladle query param update", async ({
  page,
}) => {
  await page.goto("/?story=query-parameters--query-parameters");
  await page.waitForSelector("[data-storyloaded]");
  const button = page.locator('[data-testid="addon-width"]');
  await button.click();
  const medium = page.locator("#width-medium");
  await medium.click();
  await page.waitForTimeout(1000);
  const url = page.url();
  expect(url).toContain("story=query-parameters--query-parameters");
  expect(url).toContain("foo=bar");
  expect(url).toContain("width=768");
  const unset = page.locator("#width-unset");
  await unset.click();
  await page.waitForTimeout(1000);
  const newUrl = page.url();
  expect(newUrl).toContain("foo=bar");
  expect(newUrl).not.toContain("width=768");
});
