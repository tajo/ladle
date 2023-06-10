import { test, expect } from "@playwright/test";

test("legacy parameters are passed as a context into decorators", async ({
  page,
}) => {
  await page.goto("/?story=legacy-params--world");
  await expect(page.locator("main")).toHaveText("Decorator 5Decorator 1world");
});
