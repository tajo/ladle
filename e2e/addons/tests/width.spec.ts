import { test, expect } from "@playwright/test";

test("iframed story has iframe", async ({ page }) => {
  await page.goto("/?story=width--iframed");
  await page.waitForSelector("[data-storyloaded]");
  await page.waitForSelector("[data-iframed]");
  const iframe = page.frameLocator("iframe");
  const h1 = iframe.locator("h1");
  expect(await h1.innerText()).toBe("Iframed");
});

test("iframed story doesn't have iframe in preview mode", async ({ page }) => {
  await page.goto("/?story=width--iframed&mode=preview");
  await page.waitForSelector("[data-storyloaded]");
  await expect(page.locator("h1")).toContainText("Iframed");
});

test("no iframe story can set with through the addon", async ({ page }) => {
  await page.goto("/?story=width--no-iframe");
  await page.waitForSelector("[data-storyloaded]");
  await expect(page.locator("h1")).toContainText("No Iframe");
  const button = page.locator('[data-testid="addon-width"]');
  await button.click();
  const medium = page.locator("#width-medium");
  await medium.click();
  await page.waitForSelector("[data-iframed]");
  const iframe = page.frameLocator("iframe");
  const h1 = iframe.locator("h1");
  expect(await h1.innerText()).toBe("No Iframe");
  const iframeEl = page.locator("iframe");
  expect(await iframeEl.getAttribute("style")).toContain("width: 768px");
});

test("custom width is used and added to the addon popup, apply stylesheet", async ({
  page,
}) => {
  await page.goto("/?story=width--set-custom");
  await page.waitForSelector("[data-storyloaded]");
  const button = page.locator('[data-testid="addon-width"]');
  await button.click();
  await page.waitForSelector("#width-custom");
  const iframe = page.frameLocator("iframe");
  const h1 = iframe.locator("h1");
  const color = await h1.evaluate((element) =>
    window.getComputedStyle(element).getPropertyValue("color"),
  );
  expect(color).toBe("rgb(255, 192, 203)");
});

test("allow key as a value for width", async ({ page }) => {
  await page.goto("/?story=width--set-small");
  await page.waitForSelector("[data-storyloaded]");
  const iframeEl = page.locator("iframe");
  expect(await iframeEl.getAttribute("style")).toContain("width: 640px");
});

test("width doesn't do anything in the preview mode", async ({ page }) => {
  await page.goto("/?story=width--set-small&mode=preview");
  await page.waitForSelector("[data-storyloaded]");
  await expect(page.locator("h1")).toContainText("Width set");
});

test("unset works", async ({ page }) => {
  await page.goto("/?story=width--set-small");
  await page.waitForSelector("[data-storyloaded]");
  await page.waitForSelector("[data-iframed]");
  const button = page.locator('[data-testid="addon-width"]');
  await button.click();
  const unset = page.locator("#width-unset");
  await unset.click();
  await expect(page.locator("h1")).toContainText("Width set");
});
