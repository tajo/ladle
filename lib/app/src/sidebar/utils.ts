import type { StoryTree, StoryTreeItem } from "../../../shared/types";

export const walkTree = (
  _tree: StoryTree,
  levels: string[],
  fn: (item: StoryTreeItem) => void,
  leafOnly: boolean
) => {
  const key = levels[0];
  if (key) {
    const item = _tree.find((item) => item.subId === key);
    if (item) {
      if (!leafOnly || levels.length === 1) {
        fn(item);
      }
      walkTree(item.children, levels.slice(1), fn, leafOnly);
    }
  }
};
