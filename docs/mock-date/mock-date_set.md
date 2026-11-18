# mock-date.set

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\mock-date.ts` (lines 79-89)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function set(date: string): void {
  const dateObj = new Date(date.valueOf());
  if (isNaN(dateObj.getTime())) {
    throw new TypeError("mockdate: The time set is an invalid date: " + date);
  }

  // @ts-ignore
  Date = MockDate;

  now = dateObj.valueOf();
}
```

## Docstring

_No docstring provided._

## Source

```
export function set(date: string): void {
  const dateObj = new Date(date.valueOf());
  if (isNaN(dateObj.getTime())) {
    throw new TypeError("mockdate: The time set is an invalid date: " + date);
  }

  // @ts-ignore
  Date = MockDate;

  now = dateObj.valueOf();
}
```

## Git History

- Commits: 2
- Authors: 2
- Bug fixes: 2
- Features: 2

## Callers

None

## Callees

None
