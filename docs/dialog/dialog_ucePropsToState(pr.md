# dialog.ucePropsToState(pr

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 3116-3121)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction reducePropsToState(propsList) {
  return propsList.filter(function (_ref5) {
    const disabled = _ref5.disabled;
    return !disabled;
  });
}

f
```

## Docstring

_No docstring provided._

## Source

```
function reducePropsToState(propsList) {
  return propsList.filter(function (_ref5) {
    const disabled = _ref5.disabled;
    return !disabled;
  });
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
