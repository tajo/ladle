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

export const getLastLeafId = (node: StoryTreeItem): string => {
  if (node.isExpanded && node.children && node.children.length) {
    return getLastLeafId(node.children[node.children.length - 1]);
  }
  return node.id;
};

export const getParentId = (
  nodes: StoryTree,
  nodeId: string,
  parentId: string | null
): string | null => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      return parentId;
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getParentId(nodes[i].children, nodeId, nodes[i].id);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getPrevId = (
  nodes: StoryTree,
  nodeId: string,
  parentId: string | null
): string | null => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      if (i === 0) {
        return parentId;
      } else {
        return getLastLeafId(nodes[i - 1]);
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getPrevId(nodes[i].children, nodeId, nodes[i].id);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getFirstChildId = (
  nodes: StoryTree,
  nodeId: string
): string | null => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return nodes[i].children[0].id;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getFirstChildId(nodes[i].children, nodeId);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getNextId = (
  nodes: StoryTree,
  nodeId: string,
  closestOmmer: string | null
): string | null => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return nodes[i].children[0].id;
      } else if (nodes[i + 1]) {
        return nodes[i + 1].id;
      } else {
        return closestOmmer;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getNextId(
        nodes[i].children,
        nodeId,
        nodes[i + 1] ? nodes[i + 1].id : closestOmmer
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getEndId = (nodes: StoryTree): string => {
  const endNode = nodes[nodes.length - 1];
  if (endNode.isExpanded && endNode.children && endNode.children.length) {
    return getEndId(endNode.children);
  }
  return endNode.id;
};

export const toggleIsExpanded = (
  arr: StoryTree,
  toggledNode: StoryTreeItem
): StoryTree => {
  return arr.map((node) => {
    const newNode = { ...node };
    if (newNode.id === toggledNode.id) {
      newNode.isExpanded = !newNode.isExpanded;
    }
    if (newNode.children && newNode.children.length) {
      newNode.children = toggleIsExpanded(newNode.children, toggledNode);
    }
    return newNode;
  });
};
