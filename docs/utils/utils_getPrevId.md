# utils.getPrevId

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\utils.ts` (lines 47-68)
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
}
```

## Docstring

_No docstring provided._

## Source

```
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
