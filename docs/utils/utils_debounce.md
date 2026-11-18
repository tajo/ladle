# utils.debounce

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\utils.ts` (lines 185-202)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...funcArgs: Parameters<T>) => void {
  let timerId: number | undefined;

  return function (...args: Parameters<T>) {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    timerId = window.setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args);
      timerId = undefined;
    }, delay);
  };
}
```

## Docstring

_No docstring provided._

## Source

```
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
): (...funcArgs: Parameters<T>) => void {
  let timerId: number | undefined;

  return function (...args: Parameters<T>) {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    timerId = window.setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args);
      timerId = undefined;
    }, delay);
  };
}
```

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
