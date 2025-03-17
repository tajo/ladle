import { test, expect } from "@playwright/test";

test("mdx readme is rendered", async ({ page }) => {
  await page.goto("/?story=docs--documentation");
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

test("mdx story rendering does not throw errors in console", async ({
  page,
}) => {
  page.on("console", (msg) => {
    expect(msg.type()).not.toBe("error");
  });

  await page.goto("/?story=docs--documentation");
  await expect(page.locator("h1")).toHaveText("test-page");
});
