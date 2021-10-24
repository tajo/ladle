import queryString from "../deps/query-string";
import type { StoryTree } from "../../shared/types";
import config from "./get-config";

export const storyDelimiter = "-";
export const storyEncodeDelimiter = "$";

export const getQueryStory = (locationSearch: string) =>
  (queryString.parse(locationSearch).story as string) || config.defaultStory;

export const isQueryStorySet = (locationSearch: string) =>
  !!queryString.parse(locationSearch).story;

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const storyIdToTitle = (s: string) => {
  if (!s) return "";
  return s
    .split(`${storyDelimiter}${storyDelimiter}`)
    .reverse()
    .map((level) => capitalize(level.replace(/-/g, " ")))
    .join(" - ");
};

export const getStoryTree = (
  stories: string[],
  selectedStory: string,
  allExpanded?: boolean,
) => {
  const tree: StoryTree = [];
  const addIntoTree = (
    _tree: StoryTree,
    parts: string[],
    selectedParts: string[],
    id: string,
  ) => {
    const first = parts.shift();
    let isExpanded = allExpanded ? true : false;
    let passSelectedParts: string[] = [];
    if (selectedParts[0] === first) {
      passSelectedParts = [...selectedParts.slice(1)];
      isExpanded = true;
    }
    const itemIndex = _tree.findIndex((item) => item.subId === first);
    if (!first) return;
    if (itemIndex === -1) {
      _tree.push({
        id: `${id}${first}`,
        subId: first,
        name: capitalize(first.replace(/-/g, " ")),
        isLinkable: parts.length === 0,
        isExpanded,
        isFocused: false,
        children: [],
      });
    }
    addIntoTree(
      _tree[itemIndex > -1 ? itemIndex : _tree.length - 1].children,
      parts,
      passSelectedParts,
      `${id}${first}--`,
    );
  };
  const selectedStoryPath = selectedStory
    ? selectedStory.split(`${storyDelimiter}${storyDelimiter}`)
    : [];
  stories.forEach((story) => {
    const storyPath = story.split(`${storyDelimiter}${storyDelimiter}`);
    addIntoTree(tree, storyPath, selectedStoryPath, "");
  });

  return tree;
};

export const sortStories = (a: string, b: string) => {
  const aParts = a.split("--");
  const bParts = b.split("--");
  const len = Math.min(aParts.length, bParts.length);
  for (let i = 0; i < len; i++) {
    if (aParts[i] !== bParts[i]) {
      if (!aParts[i + 1] && bParts[i + 1]) {
        return 1;
      }
      if (aParts[i + 1] && !bParts[i + 1]) {
        return -1;
      }
      if ([aParts[i], bParts[i]].sort()[0] === aParts[i]) {
        return -1;
      } else {
        return 1;
      }
    }
  }
  return 0;
};
