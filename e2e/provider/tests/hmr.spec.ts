import { test, expect } from "@playwright/test";
import fs from "fs";

const before = `export const WithState = () => {
  return (
    <>
      <input id="state-input" />
      <button>Button</button>
    </>
  );
};
`;

const after = `export const WithState = () => {
  return (
    <>
      <input id="state-input" />
      <button>Button</button>
      <button id="new-button">New</button>
    </>
  );
};
`;

test.beforeEach(async () => {
  fs.writeFileSync("./src/hmr.stories.tsx", before);
});

test.afterEach(async () => {
  fs.writeFileSync("./src/hmr.stories.tsx", before);
});

test("hmr with fast refresh works", async ({ page }) => {
  await page.goto("http://localhost:61106/?story=hmr--with-state");
  await page.locator("#state-input").fill("some state");
  fs.writeFileSync("./src/hmr.stories.tsx", after);
  await page.waitForSelector("#new-button", { timeout: 5000 });
  await expect(page.locator("#state-input")).toHaveValue("some state");
  await expect(page.locator("#new-button")).toHaveText("New");
});
