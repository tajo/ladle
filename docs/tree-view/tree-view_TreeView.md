# tree-view.TreeView

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\tree-view.tsx` (lines 28-186)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({
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
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  useHotkeys(
    config.hotkeys.previousStory,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      hotkeyStoryTransition(stories[currentIndex - 1]);
    },
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  useHotkeys(
    config.hotkeys.nextComponent,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      const storyParts = stories[currentIndex].split("--");
      const componentPart = storyParts[storyParts.length - 2];
      for (let i = currentIndex + 1; i < stories.length; i++) {
        const parts = stories[i].split("--");
        if (parts[parts.length - 2] !== componentPart) {
          hotkeyStoryTransition(stories[i]);
          return;
        }
      }
    },
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  useHotkeys(
    config.hotkeys.previousComponent,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      const storyParts = stories[currentIndex].split("--");
      const componentPart = storyParts[storyParts.length - 2];
      for (let i = currentIndex - 1; i >= 0; i--) {
        const parts = stories[i].split("--");
        const prevParts = i > 0 ? stories[i - 1].split("--") : ["", ""];
        if (
          parts[parts.length - 2] !== componentPart &&
          prevParts[prevParts.length - 2] !== parts[parts.length - 2]
        ) {
          hotkeyStoryTransition(stories[i]);
          return;
        }
      }
    },
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  const onKeyDownFn = (
    e: React.KeyboardEvent<HTMLElement>,
    item: StoryTreeItem,
  ) => {
    if (e.metaKey || e.ctrlKey || e.altKey) {
      return;
    }
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        e.stopPropagation();
        if (!item.isExpanded) {
          setTree(toggleIsExpanded(tree, item));
        } else {
          focusSelectedItem(getFirstChildId(tree, item.id));
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        e.stopPropagation();
        if (item.isExpanded) {
          setTree(toggleIsExpanded(tree, item));
        } else {
          focusSelectedItem(getParentId(tree, item.id, null));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        e.stopPropagation();
        focusSelectedItem(getPrevId(tree, item.id, null));
        break;
      case "ArrowDown": {
        e.preventDefault();
        e.stopPropagation();
        const nextId = getNextId(tree, item.id, null);
        nextId && focusSelectedItem(nextId);
        break;
      }
      case " ":
      case "Enter":
        if (!(e.target as any).href) {
          e.preventDefault();
          e.stopPropagation();
          setTree(toggleIsExpanded(tree, item));
        }
        break;
      case "Home":
        e.preventDefault();
        e.stopPropagation();
        if (tree.length) {
          focusSelectedItem(tree[0].id);
        }
        break;
      case "End":
        e.preventDefault();
        e.stopPropagation();
        focusSelectedItem(getEndId(tree));
        break;
    }
  };
  return (
    <ul
      role="tree"
      style={{ marginInlineStart: "-6px" }}
```

## Docstring

_No docstring provided._

## Source

```
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
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  useHotkeys(
    config.hotkeys.previousStory,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      hotkeyStoryTransition(stories[currentIndex - 1]);
    },
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  useHotkeys(
    config.hotkeys.nextComponent,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      const storyParts = stories[currentIndex].split("--");
      const componentPart = storyParts[storyParts.length - 2];
      for (let i = currentIndex + 1; i < stories.length; i++) {
        const parts = stories[i].split("--");
        if (parts[parts.length - 2] !== componentPart) {
          hotkeyStoryTransition(stories[i]);
          return;
        }
      }
    },
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  useHotkeys(
    config.hotkeys.previousComponent,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      const storyParts = stories[currentIndex].split("--");
      const componentPart = storyParts[storyParts.length - 2];
      for (let i = currentIndex - 1; i >= 0; i--) {
        const parts = stories[i].split("--");
        const prevParts = i > 0 ? stories[i - 1].split("--") : ["", ""];
        if (
          parts[parts.length - 2] !== componentPart &&
          prevParts[prevParts.length - 2] !== parts[parts.length - 2]
        ) {
          hotkeyStoryTransition(stories[i]);
          return;
        }
      }
    },
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  const onKeyDownFn = (
    e: React.KeyboardEvent<HTMLElement>,
    item: StoryTreeItem,
  ) => {
    if (e.metaKey || e.ctrlKey || e.altKey) {
... (truncated)
```

## Git History

- Commits: 8
- Authors: 3
- Bug fixes: 0
- Features: 3

## Callers

None

## Callees

None
