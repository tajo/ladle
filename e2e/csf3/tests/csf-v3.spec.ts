import { test, expect } from "@playwright/test";

// CSF v3 stories should resolve to a real React component via composeEnhancers
// before ArgsProvider's createElement runs (#602). Without the fix, every page
// throws "Element type is invalid ... got: object" inside ArgsProvider and the
// story does not mount.

test("CSF v3 args-only renders meta.component with merged args", async ({
  page,
}) => {
  await page.goto("/?story=csf-v3--args-only");
  await expect(page.locator('[data-testid="greeter"]')).toHaveText(
    "Hello, args-only!",
  );
});

test("CSF v3 render-only invokes the render function", async ({ page }) => {
  await page.goto("/?story=csf-v3--render-only");
  await expect(page.locator('[data-testid="render-only"]')).toHaveText(
    "render-only output",
  );
});

test("CSF v3 render+args passes merged args to the render function", async ({
  page,
}) => {
  await page.goto("/?story=csf-v3--render-with-args");
  await expect(page.locator('[data-testid="render-with-args"]')).toHaveText(
    "Hi, render-with-args!",
  );
});

test("CSF v3 empty story falls back to meta.component", async ({ page }) => {
  await page.goto("/?story=csf-v3--empty");
  await expect(page.locator('[data-testid="greeter"]')).toHaveText(
    "Hello, world!",
  );
});

test("CSF v3 stories raise no ArgsProvider createElement errors", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on("pageerror", (err) => consoleErrors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  for (const storyId of [
    "csf-v3--args-only",
    "csf-v3--render-only",
    "csf-v3--render-with-args",
    "csf-v3--empty",
  ]) {
    await page.goto(`/?story=${storyId}`);
    await page.waitForSelector("[data-storyloaded]");
  }
  expect(
    consoleErrors.filter((e) => /Element type is invalid/i.test(e)),
  ).toEqual([]);
});
