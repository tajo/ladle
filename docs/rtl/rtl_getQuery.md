# rtl.getQuery

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\rtl.tsx` (lines 7-12)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).rtl;
  if (urlVal === "true") return true;
  if (urlVal === "false") return false;
  return config.addons.rtl.defaultState;
}
```

## Docstring

_No docstring provided._

## Source

```
export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).rtl;
  if (urlVal === "true") return true;
  if (urlVal === "false") return false;
  return config.addons.rtl.defaultState;
};
```

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 0
- Features: 2

## Callers

None

## Callees

None
