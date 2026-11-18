# redirect-events.isModifierKeyPressed

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\redirect-events.ts` (lines 1-2)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(event: KeyboardEvent) =>
  event.altKey || event.ctrlKey || event.shiftKey || event.metaKey
```

## Docstring

_No docstring provided._

## Source

```
const isModifierKeyPressed = (event: KeyboardEvent) =>
  event.altKey || event.ctrlKey || event.shiftKey || event.metaKey;
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
