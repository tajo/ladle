import { test, expect } from "@playwright/test";
import fetch from "sync-fetch";

const url = "http://localhost:61000";
Object.keys(fetch(`${url}/meta.json`).json().stories).forEach((storyKey) => {
  test(`${storyKey} - compare snapshots`, async ({ page }) => {
    await page.goto(`${url}/?story=${storyKey}&mode=preview`);
    await page.waitForSelector("[data-storyloaded]");
    await expect(page).toHaveScreenshot(`${storyKey}.png`);
  });
});
