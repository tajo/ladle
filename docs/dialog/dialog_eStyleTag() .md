# dialog.eStyleTag() 

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 3347-3356)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction makeStyleTag() {
  if (!document) return null;
  const tag = document.createElement("style");
  tag.type = "text/css";
  const nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
fu
```

## Docstring

_No docstring provided._

## Source

```
function makeStyleTag() {
  if (!document) return null;
  const tag = document.createElement("style");
  tag.type = "text/css";
  const nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
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
