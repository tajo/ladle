import queryString from "query-string";
import type { StoryTree } from "../../shared/types";
//@ts-ignore
import { stories } from "./generated-list";

const firstStory = Object.keys(stories).sort()[0];
export const storyDelimiter = "-";
export const storyEncodeDelimiter = "$";

export const getQueryStory = (locationSearch: string) =>
  (queryString.parse(locationSearch).story as string) || firstStory;

export const isQueryStorySet = (locationSearch: string) =>
  !!queryString.parse(locationSearch).story;

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const storyIdToTitle = (s: string) => {
  return s
    .split(`${storyDelimiter}${storyDelimiter}`)
    .reverse()
    .map((level) => capitalize(level.replace(/-/g, " ")))
    .join(" - ");
};

export const getStoryTree = (stories: string[]) => {
  const tree: StoryTree = {};
  const addIntoTree = (_tree: StoryTree, parts: string[], id: string) => {
    const first = parts.shift();
    if (first && !_tree[first]) {
      _tree[first] = {
        id: `${id}${first}`,
        name: capitalize(first.replace(/-/g, " ")),
        isLinkable: parts.length === 0,
        children: {},
      };
    }
    first && addIntoTree(_tree[first].children, parts, `${id}${first}--`);
  };
  stories.forEach((story) => {
    const storyPath = story.split(`${storyDelimiter}${storyDelimiter}`);
    addIntoTree(tree, storyPath, "");
  });
  return tree;
};
