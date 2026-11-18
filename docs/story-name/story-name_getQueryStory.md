# story-name.getQueryStory

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\story-name.ts` (lines 7-8)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(locationSearch: string, defaultStory: string) =>
  (queryString.parse(locationSearch).story as string) || defaultStory
```

## Docstring

_No docstring provided._

## Source

```
export const getQueryStory = (locationSearch: string, defaultStory: string) =>
  (queryString.parse(locationSearch).story as string) || defaultStory;
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
