import { test, expect } from "@playwright/test";
import fetch from "sync-fetch";

// eslint-disable-next-line
//const stories = require("../build/meta.json").stories;
const metaJson = fetch("http://localhost:61000/meta.json").json();

Object.keys(metaJson.stories).forEach((storyKey) => {
  test(`${storyKey} - compare snapshots`, async ({ page }) => {
    await page.goto(`?story=${storyKey}`);
    await page.waitForSelector("[data-storyloaded]");
    await expect(page).toHaveScreenshot(`${storyKey}.png`);
  });
});
