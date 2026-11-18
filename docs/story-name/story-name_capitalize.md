# story-name.capitalize

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\story-name.ts` (lines 13-16)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
```

## Docstring

_No docstring provided._

## Source

```
export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
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
