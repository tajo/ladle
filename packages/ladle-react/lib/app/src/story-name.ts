import queryString from "query-string";
import type { StoryTree, StoryOrder } from "../../shared/types";

export const storyDelimiter = "-";
export const storyEncodeDelimiter = "$";

export const getQueryStory = (locationSearch: string, defaultStory: string) =>
  (queryString.parse(locationSearch).story as string) || defaultStory;

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

// alphabetically sort stories but prefering "folders" over leaf nodes
const storySort = (a: string, b: string) => {
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

export const sortStories = (stories: string[], storyOrder: StoryOrder) => {
  const initialSort = stories.sort(storySort);
  let configSort = [...initialSort];
  if (Array.isArray(storyOrder)) {
    configSort = storyOrder;
  } else {
    configSort = storyOrder(initialSort);
  }
  const finalSort = new Set<string>();
  configSort.forEach((story) => {
    if (story.includes("*")) {
      const prefix = story.split("*")[0];
      initialSort.forEach((s) => {
        if (s.startsWith(prefix)) {
          finalSort.add(s);
        }
      });
    } else {
      if (!initialSort.includes(story)) {
        throw new Error(
          `Story "${story}" does not exist in your storybook. Please check your storyOrder config.`,
        );
      }
      finalSort.add(story);
    }
  });
  return [...finalSort];
};
