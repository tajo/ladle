# dialog.erAction(ac

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 2901-2911)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction deferAction(action) {
  // Hiding setImmediate from Webpack to avoid inserting polyfill
  const _window = window,
    setImmediate = _window.setImmediate;

  if (typeof setImmediate !== "undefined") {
    setImmediate(action);
  } else {
    setTimeout(action, 1);
  }
}

c
```

## Docstring

_No docstring provided._

## Source

```
function deferAction(action) {
  // Hiding setImmediate from Webpack to avoid inserting polyfill
  const _window = window,
    setImmediate = _window.setImmediate;

  if (typeof setImmediate !== "undefined") {
    setImmediate(action);
  } else {
    setTimeout(action, 1);
  }
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
