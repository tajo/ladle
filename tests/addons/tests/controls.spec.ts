import { test, expect } from "@playwright/test";

test("default control values", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=controls--controls");
  await expect(page.locator("#content")).toHaveText(
    "Count: 2Disabled: noLabel: Hello worldColors: Red,BlueVariant: primarySize: small",
  );
});

test("boolean control works", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=controls--controls");
  const button = await page.locator('[data-testid="addon-control"]');
  await button.click();
  const disabled = await page.locator("#disabled");
  await disabled.click();
  await expect(page.locator("#content")).toContainText("Disabled: yes");
});

test("complex control works", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=controls--controls");
  const button = await page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.fill("textarea", '["Red","Pink"]');
  await expect(page.locator("#content")).toContainText("Colors: Red,Pink");
});

test("number control works", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=controls--controls");
  const button = await page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.fill("#count", "5");
  await expect(page.locator("#content")).toContainText("Count: 5");
});

test("string control works", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=controls--controls");
  const button = await page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.fill("#label", "Hello me");
  await expect(page.locator("#content")).toContainText("Label: Hello me");
});

test("radio control works", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=controls--controls");
  const button = await page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.check("#variant-secondary");
  await expect(page.locator("#content")).toContainText("Variant: secondary");
});

test("select control works", async ({ page }) => {
  await page.goto("http://localhost:61000/?story=controls--controls");
  const button = await page.locator('[data-testid="addon-control"]');
  await button.click();
  await page.selectOption("select#size", "big");
  await expect(page.locator("#content")).toContainText("Size: big");
});

test("controls state is passed through the URL", async ({ page }) => {
  await page.goto(
    "http://localhost:61000/?arg-b-disabled=true&arg-c-colors=%255B%2522Red%2522%2C%2522Green%2522%255D&arg-l-size=medium&arg-n-count=3&arg-r-variant=secondary&arg-s-label=Hello%20earth&story=controls--controls",
  );
  await expect(page.locator("#content")).toHaveText(
    "Count: 3Disabled: yesLabel: Hello earthColors: Red,GreenVariant: secondarySize: medium",
  );
});

test("reset to defaults", async ({ page }) => {
  await page.goto(
    "http://localhost:61000/?arg-b-disabled=true&arg-c-colors=%255B%2522Red%2522%2C%2522Green%2522%255D&arg-l-size=medium&arg-n-count=3&arg-r-variant=secondary&arg-s-label=Hello%20earth&story=controls--controls",
  );
  await expect(page.locator("#content")).toHaveText(
    "Count: 3Disabled: yesLabel: Hello earthColors: Red,GreenVariant: secondarySize: medium",
  );
  const button = await page.locator('[data-testid="addon-control"]');
  await button.click();
  const resetButton = await page.locator(
    'button:has-text("Reset to defaults")',
  );
  await resetButton.click();
  await expect(page.locator("#content")).toHaveText(
    "Count: 2Disabled: noLabel: Hello worldColors: Red,BlueVariant: primarySize: small",
  );
});
