# utils.getNextId

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\utils.ts` (lines 117-148)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(
  nodes: StoryTree,
  nodeId: string,
  closestOmmer: string | null,
): string | null => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return nodes[i].children[0].id;
      } else if (nodes[i + 1]) {
        return nodes[i + 1].id;
      } else {
        return closestOmmer;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getNextId(
        nodes[i].children,
        nodeId,
        nodes[i + 1] ? nodes[i + 1].id : closestOmmer,
      );
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
export const getNextId = (
  nodes: StoryTree,
  nodeId: string,
  closestOmmer: string | null,
): string | null => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return nodes[i].children[0].id;
      } else if (nodes[i + 1]) {
        return nodes[i + 1].id;
      } else {
        return closestOmmer;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getNextId(
        nodes[i].children,
        nodeId,
        nodes[i + 1] ? nodes[i + 1].id : closestOmmer,
      );
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
