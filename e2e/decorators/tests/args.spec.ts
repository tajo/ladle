import { test, expect } from "@playwright/test";

test("ladle context is correctly passed to decorators", async ({ page }) => {
  await page.goto("/?story=args--card-hello");
  await expect(page.locator("main")).toHaveText(
    "third Hellosecond Hellofirst Helloprivate HelloLabel: Hello",
  );
});

test("ladle doesn't remount story when control (state) is changed", async ({
  page,
}) => {
  await page.goto("/?story=args--card-hello");
  await expect(page.locator("main")).toHaveText(
    "third Hellosecond Hellofirst Helloprivate HelloLabel: Hello",
  );
  await page.fill("#persist-input", "keep");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.fill("#label", "Bye");
  await expect(page.locator("main")).toHaveText(
    "third Byesecond Byefirst Byeprivate ByeLabel: Bye",
  );
  expect(await page.locator("#persist-input").inputValue(), "keep");
});
