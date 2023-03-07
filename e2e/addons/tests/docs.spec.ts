import { test, expect } from "@playwright/test";

test("mdx readme is rendered", async ({ page }) => {
  await page.goto("http://127.0.0.1:61100?story=docs--documentation");
  await expect(page.locator("h1")).toHaveText("test-page");
  await expect(page.locator("img")).toHaveAttribute(
    "src",
    "https://ladle.dev/img/ladle-baseweb.png",
  );
  let i = 0;
  const h2s = ["Subtitle", "Install", "Usage", "Developing", "Ownership"];
  for (const h2 of await page.locator("h2").all()) {
    await expect(h2).toHaveText(h2s[i]);
    i++;
  }
});
