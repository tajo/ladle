# story-name.storySort

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\story-name.ts` (lines 78-98)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(a: string, b: string) => {
  const aParts = a.split("--");
  const bParts = b.split("--");
  const len = Math.min(aParts.length, bParts.length);
  for (let i = 0; i < len; i++) {
    if (aParts[i] !== bParts[i]) {
      if (!aParts[i + 1] && bParts[i + 1]) {
        return 1;
      }
      if (aParts[i + 1] && !bParts[i + 1]) {
        return -1;
      }
      if ([aParts[i], bParts[i]].sort()[0] === aParts[i]) {
        return -1;
      } else {
        return 1;
      }
    }
  }
  return 0;
}
```

## Docstring

_No docstring provided._

## Source

```
const storySort = (a: string, b: string) => {
  const aParts = a.split("--");
  const bParts = b.split("--");
  const len = Math.min(aParts.length, bParts.length);
  for (let i = 0; i < len; i++) {
    if (aParts[i] !== bParts[i]) {
      if (!aParts[i + 1] && bParts[i + 1]) {
        return 1;
      }
      if (aParts[i + 1] && !bParts[i + 1]) {
        return -1;
      }
      if ([aParts[i], bParts[i]].sort()[0] === aParts[i]) {
        return -1;
      } else {
        return 1;
      }
    }
  }
  return 0;
};
```

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 2

## Callers

None

## Callees

None
