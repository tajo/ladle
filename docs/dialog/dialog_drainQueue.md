# dialog.drainQueue

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 150-172)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function drainQueue() {
  if (draining) {
    return;
  }
  const timeout = runTimeout(cleanUpNextTick);
  draining = true;

  let len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
```

## Docstring

_No docstring provided._

## Source

```
function drainQueue() {
  if (draining) {
    return;
  }
  const timeout = runTimeout(cleanUpNextTick);
  draining = true;

  let len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
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
