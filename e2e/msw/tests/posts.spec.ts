import { test, expect } from "@playwright/test";

test("Post Live story fetches origin, removing default msw handler", async ({
  page,
}) => {
  await page.goto("/?story=posts--live");
  await expect(page.locator(".ladle-main")).toHaveText("Postsjson post");
});

test("Post Mocked story fetches msw default handler", async ({ page }) => {
  await page.goto("/?story=posts--mocked");
  await expect(page.locator(".ladle-main")).toHaveText("Postsmsw post default");
});

test("Post Mocked story fetches msw story level handler", async ({ page }) => {
  await page.goto("/?story=posts--replaced");
  await expect(page.locator(".ladle-main")).toHaveText(
    "Postsmsw post replaced",
  );
});
