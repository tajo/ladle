import type { StoryTreeT } from "../../cli/types";

export const storyDelimiter = "-";
export const storyEncodeDelimiter = "$";

const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const getFileId = (filename: string) => {
  const pathParts = filename.split("/");
  return pathParts[pathParts.length - 1].split(".")[0];
};

export const getEncodedStoryName = (fileId: string, namedExport: string) => {
  return `${fileId}${storyEncodeDelimiter}${storyEncodeDelimiter}${namedExport}`
    .toLocaleLowerCase()
    .replace(new RegExp(storyDelimiter, "g"), storyEncodeDelimiter);
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
