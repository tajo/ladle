# utils.getLastLeafId

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\utils.ts` (lines 21-26)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(node: StoryTreeItem): string => {
  if (node.isExpanded && node.children && node.children.length) {
    return getLastLeafId(node.children[node.children.length - 1]);
  }
  return node.id;
}
```

## Docstring

_No docstring provided._

## Source

```
export const getLastLeafId = (node: StoryTreeItem): string => {
  if (node.isExpanded && node.children && node.children.length) {
    return getLastLeafId(node.children[node.children.length - 1]);
  }
  return node.id;
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
