# tree-view.onKeyDownFn

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\tree-view.tsx` (lines 123-182)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(
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
  }
```

## Docstring

_No docstring provided._

## Source

```
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
