# redirect-events.redirectKeyup

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\redirect-events.ts` (lines 33-45)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(event: KeyboardEvent) => {
  if (shouldIgnoreEvent(event)) return;
  const newEvent = new KeyboardEvent("keyup", {
    key: event.key,
    code: event.code,
    keyCode: event.keyCode,
    altKey: event.altKey,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
    metaKey: event.metaKey,
  });
  document.dispatchEvent(newEvent);
}
```

## Docstring

_No docstring provided._

## Source

```
export const redirectKeyup = (event: KeyboardEvent) => {
  if (shouldIgnoreEvent(event)) return;
  const newEvent = new KeyboardEvent("keyup", {
    key: event.key,
    code: event.code,
    keyCode: event.keyCode,
    altKey: event.altKey,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
    metaKey: event.metaKey,
  });
  document.dispatchEvent(newEvent);
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
