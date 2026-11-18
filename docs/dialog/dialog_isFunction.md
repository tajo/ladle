# dialog.isFunction

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 434-436)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function isFunction(value) {
  return !!(value && {}.toString.call(value) == "[object Function]");
}
```

## Docstring

_No docstring provided._

## Source

```
function isFunction(value) {
  return !!(value && {}.toString.call(value) == "[object Function]");
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
