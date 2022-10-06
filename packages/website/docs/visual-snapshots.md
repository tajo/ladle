---
id: visual-snapshots
title: Visual Snapshots
---

If you use stories to develop your React components, you might be also interested in some sort of test automation. Ladle and Playwright makes it easy to take screenshots of your stories and compare them against the previous version before you changed your code. We call this visual snapshot testing. Let's take a look at how you can automate it with Ladle. This solution is quick, free and self-hosted.

It might surprise you how easy it is - less than 10 lines of code! Ladle exports a static [meta.json](./meta) file that lists all your stories and their parameters. We can use this file to generate our tests. _Note: Terms snapshots and screenshots are used interchangeably._

Check the [working example](https://github.com/tajo/ladle/tree/main/e2e/playwright) right away. There is a more detailed walkthrough in the form of [blog post](/blog/visual-snapshots).

## Playwright

[Playwright](https://playwright.dev/) is a great headless browser testing framework. It works cross-platform and cross-browser and has a nice TypeScript API. It also comes with a test runner. We use it to navigate through Ladle and capture screenshots. It can be installed as:

```sh
pnpm install @playwright/test
```

## Setup

We need to tell Playwright what & how to test. We can create a single test file that dynamically creates subtests for each individual story. The following code in `tests/snapshot.spec.ts` is the whole secret sauce:

```tsx
import { test, expect } from "@playwright/test";
// we can't create tests asynchronously, thus using the sync-fetch lib
import fetch from "sync-fetch";

// URL where Ladle is served
const url = "http://localhost:61000";

// fetch Ladle's meta file
// https://ladle.dev/docs/meta
const stories = fetch(`${url}/meta.json`).json().stories;

// iterate through stories
Object.keys(stories).forEach((storyKey) => {
  // create a test for each story
  test(`${storyKey} - compare snapshots`, async ({ page }) => {
    // navigate to the story
    await page.goto(`${url}/?story=${storyKey}&mode=preview`);
    // stories are code-splitted, wait for them to be loaded
    await page.waitForSelector("[data-storyloaded]");
    // take a screenshot and compare it with the baseline
    await expect(page).toHaveScreenshot(`${storyKey}.png`);
  });
});
```

## Run It

```sh
pnpm ladle build
pnpm ladle preview -p 61000
pnpm playwright test
```

The first time you run the `test` script it will error out since it needs to create the baseline screenshots in `tests/snapshot.spec.ts-snapshots` folder. The second run will succeed:

```sh
Running 2 tests using 1 worker

  ✓  tests/snapshot.spec.ts:23:3 › abc--first - compare snapshots (259ms)
  -  tests/snapshot.spec.ts:23:3 › abc--second - compare snapshots


  1 skipped
  1 passed (952ms)
```

You can keep adding more stories and they get automatically covered by visual snapshots. Again, there is also more detailed walkthrough in the form of [blog post](/blog/visual-snapshots) that you can follow.
