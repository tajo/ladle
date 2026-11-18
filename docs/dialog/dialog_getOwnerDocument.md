# dialog.getOwnerDocument

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 425-427)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function getOwnerDocument(element) {
  return canUseDOM() ? (element ? element.ownerDocument : document) : null;
}
```

## Docstring

_No docstring provided._

## Source

```
function getOwnerDocument(element) {
  return canUseDOM() ? (element ? element.ownerDocument : document) : null;
}
```

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
