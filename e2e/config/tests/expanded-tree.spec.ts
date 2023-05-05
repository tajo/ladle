import { test, expect } from "@playwright/test";

test("story tree is expanded", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("treeitem")).toHaveCount(5);
});
