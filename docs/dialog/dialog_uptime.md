# dialog.uptime

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 256-260)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function uptime() {
  const currentTime = new Date();
  const dif = currentTime - startTime;
  return dif / 1000;
}
```

## Docstring

_No docstring provided._

## Source

```
function uptime() {
  const currentTime = new Date();
  const dif = currentTime - startTime;
  return dif / 1000;
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
