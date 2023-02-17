import { expect, test } from "@playwright/test";
import fs from "fs";

const code = `export const Button = () => {
  return <button id="new-button">New</button>;
};
`;

test.afterEach(async () => {
  if (fs.existsSync("./src/add.show.tsx")) {
    fs.unlinkSync("./src/add.show.tsx");
  }
});

test("adding new story triggers a full page reload", async ({ page }) => {
  await page.goto("http://localhost:61108");
  fs.writeFileSync("./src/add.show.tsx", code);
  await page.waitForTimeout(1000);
  await expect(page.locator("nav")).toContainText("Add");
  await page.goto("http://localhost:61108/?story=add--button");
  await expect(page.locator("#new-button")).toHaveText("New");
});
