import { test, expect } from "@playwright/test";

test("Todos Live story fetches origin", async ({ page }) => {
  await page.goto("/?story=todos--live");
  await expect(page.locator(".ladle-main")).toHaveText("Todosjson todo");
});

test("Todos mocked story fetches msw", async ({ page }) => {
  await page.goto("/?story=todos--mocked");
  await expect(page.locator(".ladle-main")).toHaveText("Todosmsw todo");
});
