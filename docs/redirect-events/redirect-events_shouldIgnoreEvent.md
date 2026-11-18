# redirect-events.shouldIgnoreEvent

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\redirect-events.ts` (lines 4-15)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(event: KeyboardEvent) => {
  const target = (event.target || {}) as HTMLElement;
  if (
    !event.key ||
    target.isContentEditable ||
    (["INPUT", "TEXTAREA"].includes(target.nodeName) &&
      !isModifierKeyPressed(event))
  ) {
    return true;
  }
  return false;
}
```

## Docstring

_No docstring provided._

## Source

```
const shouldIgnoreEvent = (event: KeyboardEvent) => {
  const target = (event.target || {}) as HTMLElement;
  if (
    !event.key ||
    target.isContentEditable ||
    (["INPUT", "TEXTAREA"].includes(target.nodeName) &&
      !isModifierKeyPressed(event))
  ) {
    return true;
  }
  return false;
};
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
