import { test, expect } from "@playwright/test";

test("head.html gets appended", async ({ page }) => {
  await page.goto("http://localhost:61107/?story=hello--styles");
  await expect(page.locator(".file")).toHaveCSS("color", "rgb(255, 192, 203)");
});

test("appendToHead gets appended", async ({ page }) => {
  await page.goto("http://localhost:61107/?story=hello--styles");
  await expect(page.locator(".append")).toHaveCSS("color", "rgb(0, 128, 0)");
});
