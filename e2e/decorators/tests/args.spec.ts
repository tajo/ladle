import { test, expect } from "@playwright/test";

test("ladle context is correctly passed to decorators", async ({ page }) => {
  await page.goto("http://localhost:61103/?story=args--card-hello");
  await expect(page.locator("main")).toHaveText(
    "third Hellosecond Hellofirst Helloprivate HelloLabel: Hello",
  );
});
