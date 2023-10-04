import { test, expect } from "@playwright/test";

test("when directly open the story, remain non-ladle query parameters", async ({
  page,
}) => {
  await page.goto("/?story=query-parameters--query-parameters");
  await page.waitForSelector("[data-storyloaded]");
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
  await page.goto("/?story=a11y--issues");
  await page.getByText("A11y").click();
  await page.getByRole("link", { name: "Issues" }).click();
  await page.waitForSelector("[data-storyloaded]");
  await page.pause();
  const url = page.url();
  expect(url).toContain("story=a11y--issues");
  expect(url).not.toContain("foo=bar"); // The non-ladle query parameter is removed
});
