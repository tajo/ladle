import { test, expect } from "@playwright/test";
// we can't create tests asynchronously, thus using the sync-fetch lib
import fetch from "sync-fetch";

// URL where Ladle is served
const url = "http://127.0.0.1:61110";

// set different viewport
// test.use({
//   viewport: { width: 500, height: 400 },
// });

// run tests with browser open
// test.use({ headless: false });

// fetch Ladle's meta file
// https://ladle.dev/docs/meta
const stories = fetch(`${url}/meta.json`).json().stories;

// iterate through stories
Object.keys(stories).forEach((storyKey) => {
  // create a test for each story
  test(`${storyKey} - compare snapshots`, async ({ page }) => {
    // skip stories that are marked as skipped
    test.skip(stories[storyKey].meta.skip, "meta.skip is true");
    // navigate to the story
    await page.goto(`${url}/?story=${storyKey}&mode=preview`);
    // stories are code-splitted, wait for them
    await page.waitForSelector("[data-storyloaded]");
    // take and compare a screenshot
    await expect(page).toHaveScreenshot(`${storyKey}.png`);
  });
});
