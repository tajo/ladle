# dialog.ateSidecarMedium(op

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 2014-2021)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  const medium = innerCreateMedium(null);
  medium.options = __assign$1({ async: true, ssr: false }, options);
  return medium;
}

c
```

## Docstring

_No docstring provided._

## Source

```
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  const medium = innerCreateMedium(null);
  medium.options = __assign$1({ async: true, ssr: false }, options);
  return medium;
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
