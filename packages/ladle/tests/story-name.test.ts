import { test, expect, describe } from "vitest";
import { sortStories } from "../lib/app/src/story-name";

const identity = (s: string[]) => s;

describe("sortStories", () => {
  test("single level with default sort", () => {
    expect(sortStories(["a", "c", "b"], identity)).toStrictEqual([
      "a",
      "b",
      "c",
    ]);
  });
  test("two levels with default sort", () => {
    expect(
      sortStories(["a--b", "a--a", "a", "c--b", "b"], identity),
    ).toStrictEqual(["a--a", "a--b", "c--b", "a", "b"]);
  });
  test("config.sortOrder is array", () => {
    expect(
      sortStories(["a--b", "a--a", "a", "c", "b"], ["a", "b"]),
    ).toStrictEqual(["a", "b"]);
  });
  test("config.sortOrder is array with non-existing story", () => {
    expect(() =>
      sortStories(["a--b", "a--a", "a", "c", "b"], ["a", "b", "x"]),
    ).toThrow(
      `Story "x" does not exist in your storybook. Please check your storyOrder config.`,
    );
  });
  test("config.sortOrder is array with wild card", () => {
    expect(
      sortStories(
        ["a--b", "a--a", "a", "c--a", "c--b", "b", "b--x"],
        ["c--*", "a*", "b", "a"],
      ),
    ).toStrictEqual(["c--a", "c--b", "a--a", "a--b", "a", "b"]);
  });
  test("config.sortOrder is fn", () => {
    expect(
      sortStories(["a--b", "a--a", "a", "c--a", "c--b", "b", "b--x"], () => [
        "c--a",
        "b",
        "b--x",
      ]),
    ).toStrictEqual(["c--a", "b", "b--x"]);
  });
  test("config.sortOrder is fn with wild card", () => {
    expect(
      sortStories(["a--b", "a--a", "a", "c--a", "c--b", "b", "b--x"], () => [
        "c--*",
        "a*",
        "b",
        "a",
      ]),
    ).toStrictEqual(["c--a", "c--b", "a--a", "a--b", "a", "b"]);
  });
});
