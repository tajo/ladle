import { test, expect } from "@playwright/test";

test("the date is mocked", async ({ page }) => {
  await page.goto("/?story=mock-date--active");
  const dateValue = new Date("1995-12-17T03:24:00");
  await expect(page.locator("h1")).toHaveText(
    dateValue.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );
});

test("the date is current", async ({ page }) => {
  await page.goto("/?story=mock-date--inactive");
  const dateValue = new Date();
  await expect(page.locator("h1")).toHaveText(
    dateValue.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  );
});
