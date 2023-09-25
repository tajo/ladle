import { test, expect } from "@playwright/test";
import queryString from "query-string";

test("default control values", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  await expect(page.locator("#content")).toHaveText(
    [
      "Count: 2",
      "Disabled: no",
      "Label: Hello world",
      "Colors: Red,Blue",
      "Variant: primary",
      "Size: ",
      "Range: 1",
      "Mountain: snowbird",
      "Snowing: yes",
      "Inches: 12",
      "Color: pink",
      "Date: today",
      "variant is string",
      "size is undefined",
    ].join(""),
  );
});

test("boolean control works", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  const disabled = page.locator("#disabled");
  await disabled.click();
  await expect(page.locator("#content")).toContainText("Disabled: yes");
});

test("complex control works", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.fill("textarea", '["Red","Pink"]');
  await expect(page.locator("#content")).toContainText("Colors: Red,Pink");
});

test("number control works", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.fill("#count", "5");
  await expect(page.locator("#content")).toContainText("Count: 5");
});

test("range control works", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  const rangeControl = page.locator(
    '[data-testid="ladle-dialog"] >> tr:has(:text("range"))',
  );
  await expect(rangeControl).toContainText("1");
  await expect(rangeControl).toContainText("1 / 10");
  await page.fill("#range", "5.5");
  await expect(page.locator("#content")).toContainText("Range: 5.5");
  await expect(rangeControl).toContainText("5.5 / 10");
});

test("string control works", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.fill("#label", "Hello me");
  await expect(page.locator("#content")).toContainText("Label: Hello me");
});

test("radio control works", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.check("#variant-secondary");
  await expect(page.locator("#content")).toContainText("Variant: secondary");
  await expect(page.locator("#content")).toContainText("variant is string");
});

test("radio control boolean type works", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.check("#variant-false");
  await expect(page.locator("#content")).toContainText("variant is boolean");
  await page.check("#variant-secondary");
  await expect(page.locator("#content")).toContainText("variant is string");
  await page.check("#variant-true");
  await expect(page.locator("#content")).toContainText("variant is boolean");
});

test("select control works", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.selectOption("select#size", "big");
  await expect(page.locator("#content")).toContainText("Size: big");
});

test("select control boolean type work", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.selectOption("select#size", "false");
  await expect(page.locator("#content")).toContainText("size is boolean");
  await page.selectOption("select#size", "medium");
  await expect(page.locator("#content")).toContainText("size is string");
  await page.selectOption("select#size", "true");
  await expect(page.locator("#content")).toContainText("size is boolean");
});

test("check control works", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.check("#airports-sfo");
  await expect(page.locator("#content")).toContainText("Airport: sfo");
  await page.check("#airports-slc");
  await expect(page.locator("#content")).toContainText("Airport: sfosxc");
  await page.check("#airports-slc");
  await expect(page.locator("#content")).toContainText("Airport: sfo");
});

test("set defaults and args inheritence works", async ({ page }) => {
  await page.goto("/?story=controls--initial");
  await expect(page.locator("#content")).toHaveText(
    "Variant: secondaryAirport: slcCountry: Empty: City: Food:",
  );
});

test("controls state is passed through the URL", async ({ page }) => {
  await page.goto(
    `/?story=controls--controls&${queryString.stringify({
      "arg-count": 3,
      "arg-disabled": true,
      "arg-label": "Hello earth",
      "arg-colors": '["Red","Green"]',
      "arg-variant": false,
      "arg-size": "medium",
      "arg-range": 10,
    })}`,
  );
  await expect(page.locator("#content")).toHaveText(
    [
      "Count: 3",
      "Disabled: yes",
      "Label: Hello earth",
      "Colors: Red,Green",
      "Variant: ",
      "Size: medium",
      "Range: 10",
      "Mountain: snowbird",
      "Snowing: yes",
      "Inches: 12",
      "Color: pink",
      "Date: today",
      "variant is boolean",
      "size is string",
    ].join(""),
  );
});

test("reset to defaults", async ({ page }) => {
  await page.goto(
    `/?story=controls--controls&${queryString.stringify({
      "arg-count": 3,
      "arg-disabled": true,
      "arg-label": "Hello earth",
      "arg-colors": '["Red","Green"]',
      "arg-variant": "secondary",
      "arg-size": "medium",
      "arg-range": 10,
    })}`,
  );
  await expect(page.locator("#content")).toHaveText(
    [
      "Count: 3",
      "Disabled: yes",
      "Label: Hello earth",
      "Colors: Red,Green",
      "Variant: secondary",
      "Size: medium",
      "Range: 10",
      "Mountain: snowbird",
      "Snowing: yes",
      "Inches: 12",
      "Color: pink",
      "Date: today",
      "variant is string",
      "size is string",
    ].join(""),
  );
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  const resetButton = page.locator('button:has-text("Reset to defaults")');
  await resetButton.click();
  await expect(page.locator("#content")).toHaveText(
    [
      "Count: 2",
      "Disabled: no",
      "Label: Hello world",
      "Colors: Red,Blue",
      "Variant: primary",
      "Size: ",
      "Range: 1",
      "Mountain: snowbird",
      "Snowing: yes",
      "Inches: 12",
      "Color: pink",
      "Date: today",
      "variant is string",
      "size is undefined",
    ].join(""),
  );
});

test("test export default level argTypes", async ({ page }) => {
  await page.goto("/?story=controls--controls");
  const button = page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.check("#cities-Prague");
  await expect(page.locator("#content")).toContainText("Cities: Prague");
});

test("do not turn select options number values to strings", async ({
  page,
}) => {
  await page.goto("/?arg-size=22&story=controls--keep-numbers");
  await expect(page.locator("h1")).toHaveText("22 - number");
});
