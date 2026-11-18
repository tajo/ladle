# story-name.storyIdToTitle

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\story-name.ts` (lines 18-25)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(s: string) => {
  if (!s) return "";
  return s
    .split(`${storyDelimiter}${storyDelimiter}`)
    .reverse()
    .map((level) => capitalize(level.replace(/-/g, " ")))
    .join(" - ");
}
```

## Docstring

_No docstring provided._

## Source

```
export const storyIdToTitle = (s: string) => {
  if (!s) return "";
  return s
    .split(`${storyDelimiter}${storyDelimiter}`)
    .reverse()
    .map((level) => capitalize(level.replace(/-/g, " ")))
    .join(" - ");
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
