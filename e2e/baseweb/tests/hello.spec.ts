import { test, expect } from "@playwright/test";

test("Base Web and CSSStyleSheet works correctly without iframe", async ({
  page,
}) => {
  await page.goto("/?story=hello--world");
  await expect(page.locator('[data-baseweb="button"]')).toHaveCSS(
    "border-bottom-left-radius",
    "8px",
  );
  await expect(page.locator("h1")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
  const button = await page.locator('[data-testid="add"]');
  await button.click();
  await expect(page.locator("h1")).toHaveCSS(
    "background-color",
    "rgb(255, 192, 203)",
  );
  const buttonRemove = await page.locator('[data-testid="remove"]');
  await buttonRemove.click();
  await expect(page.locator("h1")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
});

test("Base Web and CSSStyleSheet works correctly in iframe", async ({
  page,
}) => {
  await page.goto("/?story=hello--world&width=414");
  await expect(
    page.frameLocator("iframe").locator('[data-baseweb="button"]'),
  ).toHaveCSS("border-bottom-left-radius", "8px");
  await expect(page.frameLocator("iframe").locator("h1")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
  const button = await page
    .frameLocator("iframe")
    .locator('[data-testid="add"]');
  await button.click();
  await expect(page.frameLocator("iframe").locator("h1")).toHaveCSS(
    "background-color",
    "rgb(255, 192, 203)",
  );
  const buttonRemove = await page
    .frameLocator("iframe")
    .locator('[data-testid="remove"]');
  await buttonRemove.click();
  await expect(page.frameLocator("iframe").locator("h1")).toHaveCSS(
    "background-color",
    "rgba(0, 0, 0, 0)",
  );
});
