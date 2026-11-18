# utils.getParentId

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\utils.ts` (lines 28-45)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(
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
}
```

## Docstring

_No docstring provided._

## Source

```
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
