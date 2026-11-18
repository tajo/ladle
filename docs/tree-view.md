# Module: tree-view

**File:** `\packages\ladle\lib\app\src\sidebar\tree-view.tsx`

## Overview

Module `tree-view` contains 4 analyzed entities.

```
import * as React from "react";
import cx from "classnames";
import { useHotkeys } from "react-hotkeys-hook";
import config from "../get-config";
import { getHref } from "../history";
import { Page, Down } from "../icons";
import { getStoryTree } from "../story-name";
import {
  getEndId,
  getFirstChildId,
  getFirstLink,
  getSubtree,
  getNextId,
  getParentId,
  getPrevId,
  toggleIsExpanded,
} from "./utils";
import type {
  StoryTree,
  StoryTreeItem,
  UpdateStory,
} from "../../../shared/types";

type TreeItemRefs = {
  current: { [key: string]: HTMLElement | null };
};

const TreeView = ({
  stories,
  story,
  updateStory,
  allExpanded,
  searchRef,
  setTreeRootRef,
  hotkeys,
}: {
  stories: string[];
  story: string;
  searchRef: React.Ref<HTMLInputElement>;
  updateStory: UpdateStory;
  setTreeRootRef: (root: HTMLUListElement | null) => void;
  allExpanded?: boolean;
  hotkeys: boolean;
}) => {
  const treeItemRefs: TreeItemRefs = React.useRef({});
  const [tree, setTree] = React.useState(
    getStoryTree(stories, story, allExpanded),
  );
  React.useEffect(() => {
    setTree(getStoryTree(stories, story, allExpanded));
  }, [stories.join(",")]);

  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(
    tree.length ? tree[0].id : null,
  );

  const focusSelectedItem = (id: string | null) => {
    if (id && treeItemRefs && treeItemRefs.current[id]) {
      treeItemRefs.current[id]?.focus();
    }
    setSelectedItemId(id ? id : tree[0].id);
    !id && (searchRef as any).current.focus();
  };
  const hotkeyStoryTransition = (story?: string) => {
    if (story) {
      updateStory(story);
      setTree(getStoryTree(stories, story, allExpanded));
      setTimeout(() => focusSelectedItem(story), 1);
    }
  };
  useHotkeys(
    config.hotkeys.nextStory,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      hotkeyStoryTransition(stories[currentIndex + 1]);
    },
    { preventDefault: true, enableOnFor
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `tree-view.TreeView` | function | No description |
| `tree-view.onKeyDownFn` | function | No description |
| `tree-view.hotkeyStoryTransition` | function | No description |
| `tree-view.focusSelectedItem` | function | No description |

## Git History

- Commits: 8
- Authors: 3
- Bug fixes: 0
- Features: 3

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
