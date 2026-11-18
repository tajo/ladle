# utils.getSubtree

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\utils.ts` (lines 70-81)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(nodes: StoryTree, nodeId: string): StoryTree => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      return nodes[i].children;
    }
    const res = getSubtree(nodes[i].children, nodeId);
    if (res.length) {
      return res;
    }
  }
  return [];
}
```

## Docstring

_No docstring provided._

## Source

```
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
  return [];
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
