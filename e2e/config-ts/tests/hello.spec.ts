import { expect, test } from "@playwright/test";

test("default story is rendered", async ({ page }) => {
  await page.goto("http://127.0.0.1:61108/?story=hello--world");
  await expect(page.locator("h1")).toHaveText("Hello World");
});

test("__filename and __dirname are replaced", async ({ page }) => {
  await page.goto("http://127.0.0.1:61108/?story=hello--world");

  await expect(page.locator("[data-test=filename_root]")).toHaveText(
    /e2e[\/\\]config-ts[\/\\]vite\.config\.ts/,
  );
  await expect(page.locator("[data-test=dirname_root]")).toHaveText(
    /e2e[\/\\]config-ts/,
  );

  await expect(page.locator("[data-test=filename_myPlugin]")).toHaveText(
    /e2e[\/\\]config-ts[\/\\]vite-my-plugin\.ts/,
  );
  await expect(page.locator("[data-test=dirname_myPlugin]")).toHaveText(
    /e2e[\/\\]config-ts/,
  );
});
