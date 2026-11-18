# Module: utils

**File:** `\packages\ladle\lib\app\src\sidebar\utils.ts`

## Overview

Module `utils` contains 1 analyzed entities.

```
import type { StoryTree, StoryTreeItem } from "../../../shared/types";

export const walkTree = (
  _tree: StoryTree,
  levels: string[],
  fn: (item: StoryTreeItem) => void,
  leafOnly: boolean,
): void => {
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
  parentId: string | null,
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
  parentId: string | null,
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

export const getSubtree = (nodes: StoryTree, nodeId: string): StoryTree => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      return nodes[i].children;
    }
    const res = getSubtree(nodes[i].children, nodeId);
    if (res.length) {
      return res;
    }
  }
  retu
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `utils.fetchData` | function | No description |

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
