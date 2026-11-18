# utils.getEndId

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\utils.ts` (lines 150-156)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(nodes: StoryTree): string => {
  const endNode = nodes[nodes.length - 1];
  if (endNode.isExpanded && endNode.children && endNode.children.length) {
    return getEndId(endNode.children);
  }
  return endNode.id;
}
```

## Docstring

_No docstring provided._

## Source

```
export const getEndId = (nodes: StoryTree): string => {
  const endNode = nodes[nodes.length - 1];
  if (endNode.isExpanded && endNode.children && endNode.children.length) {
    return getEndId(endNode.children);
  }
  return endNode.id;
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
