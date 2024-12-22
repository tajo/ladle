---
slug: visual-snapshots
title: Visual Snapshots
authors: vojtech
tags: [ladle, playwright, react, testing, visual, snapshots, screenshots]
---

If you use stories to develop your React components, you might be also interested in some sort of test automation. Ladle and Playwright makes it easy to take screenshots of your stories and compare them against the previous version before you changed your code. We call this visual snapshot testing. Let's take a look at how you can automate it with Ladle. This solution is quick, free and self-hosted.

It might surprise you how easy it is - less than 10 lines of code! Ladle exports a static [meta.json](/docs/meta) file that lists all your stories and their parameters. We can use this file to generate our tests. _Note: Terms snapshots and screenshots are used interchangeably._

<!-- truncate -->

You can jump into the [working example](https://github.com/tajo/ladle/tree/main/e2e/playwright) right away. Or you can follow the steps below.

## The Workflow

1. Build Ladle using your stories
2. Start an HTTP server for Ladle
3. Fetch the meta.json file
4. Dynamically generate a test for each story
5. Take a screenshot & compare it with the baseline
6. Commit changes if there are any
7. Profit

## Playwright

[Playwright](https://playwright.dev/) is a great headless browser testing framework. It works cross-platform and cross-browser and has a nice TypeScript API. It also comes with a test runner. We use it to navigate through Ladle and capture screenshots. It can be installed as:

```sh
pnpm install @playwright/test
```

We also need some other dependencies:

```sh
pnpm install sync-fetch
```

## Stories

Let's create a story file `src/abc.stories.tsx` so we have something to test. Presumably, you already have stories with your own React components.

```tsx title="src/abc.stories.tsx"
export const First = () => {
  return <h1>First</h1>;
};

export const Second = () => {
  return <h1>Second</h1>;
};
Second.meta = {
  skip: true,
};
```

## Test Setup

Now we need to tell Playwright what & how to test. We can create a single test file that dynamically creates subtests for each individual story. The following code in `tests/snapshot.spec.ts` is the secret sauce of this setup:

```tsx title="tests/snapshot.spec.ts"
import { test, expect } from "@playwright/test";
// we can't create tests asynchronously, thus using the sync-fetch lib
import fetch from "sync-fetch";

// URL where Ladle is served
const url = "http://127.0.0.1:61000";

// fetch Ladle's meta file
// https://ladle.dev/docs/meta
const stories = fetch(`${url}/meta.json`).json().stories;

// iterate through stories
Object.keys(stories).forEach((storyKey) => {
  // create a test for each story
  test(`${storyKey} - compare snapshots`, async ({ page }) => {
    // skip stories with `meta.skip` set to true
    test.skip(stories[storyKey].meta.skip, "meta.skip is true");
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

Our setup is ready, we just need to run it. Let's add some `package.json` scripts that we can use as shortcuts:

```json title="package.json"
{
  "scripts": {
    "serve": "ladle serve",
    "build": "ladle build && ladle preview -p 61000",
    "test:dev": "TYPE=dev pnpm exec playwright test",
    "test": "pnpm exec playwright test",
    "test:update": "pnpm exec playwright test -u"
  }
}
```

We also need to [setup playwright](https://playwright.dev/docs/test-configuration) so it starts a web server before running our snapshots:

```ts title="playwright.config.ts"
export default {
  webServer: {
    command: process.env.TYPE === "dev" ? "pnpm serve" : "pnpm build",
    url: `http://127.0.0.1:61000`,
  },
};
```

If you use yarn or npm you might want to use [npx](https://docs.npmjs.com/cli/v8/commands/npx) instead.

The first time you run the `test` script it will error out since it needs to create the baseline screenshots in `tests/snapshot.spec.ts-snapshots` folder. The second run will succeed:

```sh
Running 2 tests using 1 worker

  ✓  tests/snapshot.spec.ts:23:3 › abc--first - compare snapshots (259ms)
  -  tests/snapshot.spec.ts:23:3 › abc--second - compare snapshots


  1 skipped
  1 passed (952ms)
```

You can keep adding more stories and they get automatically covered by visual snapshots. If you change an existing story, the test will fail. The playwright also outputs a diff image that highlights the differences between the baseline and actual screenshot. If everything seems ok, you need to run `test:update` to update existing snapshots. When your code matches the desirable looks you should commit both the code and snapshot changes. This updates the baseline for the future code changes.

## Possible Improvements

The first problem you might run into is that your CI (tried [Github Actions](https://github.com/features/actions) yet?) might render fonts differently than your local machine. The easiest way to make sure you use the same environment locally and remotely is to use [docker](https://www.docker.com/).

Our example setup uses a made up `meta.skip` parameter to opt-out of snapshots for selected stories. You could add more customization like viewport size or browser by adding arbitrary meta parameters to the story and updating the `tests/snapshot.spec.ts` logic accordingly.

Playwright can do a lot more than just screenshot taking. You can also use it to write [all other sorts of assertion/integration tests](https://playwright.dev/docs/writing-tests) since you already have the environment ready.

You might reach some point when storing screenshots in your repository is not working anymore due to the size - imagine hundreds of developers using a single monorepo churning thousands of images. At Uber, we've built an internal service that uses S3 to store screenshots, Aurora DB to store test metadata and provides a custom UI to compare & approve changes (GitHub's PR review UI is pretty good for images too!). The goal was to move the snapshot creation and updates into a remote environment so developers are not slowed down by it. It also helps to prevent the issue of local vs remote environment.

## Conclusion

We used Playwright and wrote 10 lines of code to automate visual snapshots for our stories and gained great coverage for our React components! Ladle was built for this - to be small, fast and integrate well with other tools. This should give you a good starting point for your own automated and end-to-end testing.
