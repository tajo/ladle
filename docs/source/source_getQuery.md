# source.getQuery

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\source.tsx` (lines 16-21)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).source;
  if (urlVal === "true") return true;
  if (urlVal === "false") return false;
  return config.addons.source.defaultState;
}
```

## Docstring

_No docstring provided._

## Source

```
export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).source;
  if (urlVal === "true") return true;
  if (urlVal === "false") return false;
  return config.addons.source.defaultState;
};
```

## Git History

- Commits: 9
- Authors: 4
- Bug fixes: 1
- Features: 5

## Callers

None

## Callees

None
