# dialog.useForceUpdate

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 470-477)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function useForceUpdate() {
  const _React$useState2 = react.useState(Object.create(null)),
    dispatch = _React$useState2[1];

  return react.useCallback(function () {
    dispatch(Object.create(null));
  }, []);
}
```

## Docstring

_No docstring provided._

## Source

```
function useForceUpdate() {
  const _React$useState2 = react.useState(Object.create(null)),
    dispatch = _React$useState2[1];

  return react.useCallback(function () {
    dispatch(Object.create(null));
  }, []);
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
