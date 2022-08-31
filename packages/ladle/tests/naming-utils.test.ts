import { test, expect } from "vitest";
import { kebabCase } from "../lib/cli/vite-plugin/naming-utils.js";

test("kebabCase", () => {
  expect(kebabCase("ChampsÉlysées")).toBe("champs-élysées");
  expect(kebabCase("our-animals--mammals")).toBe("our-animals--mammals");
  expect(kebabCase("the quick brown fox")).toBe("the-quick-brown-fox");
  expect(kebabCase("the-quick-brown-fox")).toBe("the-quick-brown-fox");
  expect(kebabCase("the_quick_brown_fox")).toBe("the-quick-brown-fox");
  expect(kebabCase("theQuickBrownFox")).toBe("the-quick-brown-fox");
  expect(kebabCase("thequickbrownfox")).toBe("thequickbrownfox");
  expect(kebabCase("theQUICKBrownFox")).toBe("the-quick-brown-fox");
});
