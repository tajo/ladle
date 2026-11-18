# tree-view.focusSelectedItem

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\tree-view.tsx` (lines 57-63)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(id: string | null) => {
    if (id && treeItemRefs && treeItemRefs.current[id]) {
      treeItemRefs.current[id]?.focus();
    }
    setSelectedItemId(id ? id : tree[0].id);
    !id && (searchRef as any).current.focus();
  }
```

## Docstring

_No docstring provided._

## Source

```
  const focusSelectedItem = (id: string | null) => {
    if (id && treeItemRefs && treeItemRefs.current[id]) {
      treeItemRefs.current[id]?.focus();
    }
    setSelectedItemId(id ? id : tree[0].id);
    !id && (searchRef as any).current.focus();
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
