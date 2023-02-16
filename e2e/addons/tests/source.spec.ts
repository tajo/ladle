import { test, expect } from "@playwright/test";

test("boolean control works", async ({ page }) => {
  await page.goto("http://localhost:61100/?story=controls--controls");
  const button = await page.locator('[data-testid="addon-source"]');
  await button.click();
  await expect(page.locator(".ladle-code")).toContainText(
    "src/controls.stories.tsx",
  );
  await expect(page.locator("pre")).toContainText(
    'import type { Story } from "@ladle/react"',
  );
});
