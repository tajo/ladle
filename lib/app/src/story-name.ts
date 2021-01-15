import type { StoryTreeT } from "../../cli/types";

export const storyDelimiter = "-";
export const storyEncodeDelimiter = "$";

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getStoryTree = (stories: string[]) => {
  const tree: StoryTreeT = {};
  const addIntoTree = (_tree: StoryTreeT, parts: string[], id: string) => {
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
