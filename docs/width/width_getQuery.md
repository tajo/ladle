# width.getQuery

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\width.tsx` (lines 10-22)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).width;
  let res = 0;
  Object.keys(config.addons.width.options).forEach((key) => {
    if (
      key === urlVal ||
      parseInt(urlVal as string, 10) === config.addons.width.options[key]
    ) {
      res = config.addons.width.options[key];
    }
  });
  return res !== 0 ? res : config.addons.width.defaultState;
}
```

## Docstring

_No docstring provided._

## Source

```
export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).width;
  let res = 0;
  Object.keys(config.addons.width.options).forEach((key) => {
    if (
      key === urlVal ||
      parseInt(urlVal as string, 10) === config.addons.width.options[key]
    ) {
      res = config.addons.width.options[key];
    }
  });
  return res !== 0 ? res : config.addons.width.defaultState;
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
