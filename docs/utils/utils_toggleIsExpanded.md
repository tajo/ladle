# utils.toggleIsExpanded

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\utils.ts` (lines 158-183)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(
  arr: StoryTree,
  toggledNode: StoryTreeItem,
): StoryTree => {
  return arr.map((node, order) => {
    const newNode = { ...node };
    if (newNode.id === toggledNode.id) {
      newNode.isExpanded = !newNode.isExpanded;
    }
    if (toggledNode.id === "+" && order === 0) {
      newNode.isExpanded = true;
    }
    if (toggledNode.id === "-") {
      newNode.isExpanded = false;
    }
    if (newNode.children && newNode.children.length) {
      newNode.children = toggleIsExpanded(
        newNode.children,
        newNode.id === toggledNode.id
          ? ({ id: newNode.isExpanded ? "+" : "-" } as StoryTreeItem)
          : toggledNode,
      );
    }
    return newNode;
  });
}
```

## Docstring

_No docstring provided._

## Source

```
export const toggleIsExpanded = (
  arr: StoryTree,
  toggledNode: StoryTreeItem,
): StoryTree => {
  return arr.map((node, order) => {
    const newNode = { ...node };
    if (newNode.id === toggledNode.id) {
      newNode.isExpanded = !newNode.isExpanded;
    }
    if (toggledNode.id === "+" && order === 0) {
      newNode.isExpanded = true;
    }
    if (toggledNode.id === "-") {
      newNode.isExpanded = false;
    }
    if (newNode.children && newNode.children.length) {
      newNode.children = toggleIsExpanded(
        newNode.children,
        newNode.id === toggledNode.id
          ? ({ id: newNode.isExpanded ? "+" : "-" } as StoryTreeItem)
          : toggledNode,
      );
    }
    return newNode;
  });
};
```

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
