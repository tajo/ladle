# utils.getFirstLink

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\utils.ts` (lines 83-91)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(
  nodes: StoryTree,
  nodeId: string,
): StoryTreeItem => {
  if (nodes[0].isLinkable) {
    return nodes[0];
  }
  return getFirstLink(nodes[0].children, nodeId);
}
```

## Docstring

_No docstring provided._

## Source

```
export const getFirstLink = (
  nodes: StoryTree,
  nodeId: string,
): StoryTreeItem => {
  if (nodes[0].isLinkable) {
    return nodes[0];
  }
  return getFirstLink(nodes[0].children, nodeId);
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
