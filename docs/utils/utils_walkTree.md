# utils.walkTree

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\utils.ts` (lines 3-19)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(
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
}
```

## Docstring

_No docstring provided._

## Source

```
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
