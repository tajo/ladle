import { expect, test } from "@playwright/test";
import fs from "fs";

const code = `export const Button = () => {
  return <button id="new-button">New</button>;
};
`;

test.afterEach(async () => {
  if (fs.existsSync("./src/add.stories.tsx")) {
    fs.unlinkSync("./src/add.stories.tsx");
  }
});

test("adding new story triggers a full page reload", async ({ page }) => {
  await page.goto("http://localhost:61106/?story=hmr--with-state");
  fs.writeFileSync("./src/add.stories.tsx", code);
  await page.waitForTimeout(1000);
  await expect(page.locator("nav")).toHaveText("AddHelloHmrWith stateMeta");
  await page.goto("http://localhost:61106/?story=add--button");
  await expect(page.locator("#new-button")).toHaveText("New");
});
