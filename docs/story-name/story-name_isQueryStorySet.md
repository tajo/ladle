# story-name.isQueryStorySet

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\story-name.ts` (lines 10-11)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(locationSearch: string) =>
  !!queryString.parse(locationSearch).story
```

## Docstring

_No docstring provided._

## Source

```
export const isQueryStorySet = (locationSearch: string) =>
  !!queryString.parse(locationSearch).story;
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
