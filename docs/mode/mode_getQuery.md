# mode.getQuery

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\mode.tsx` (lines 6-16)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(locationSearch: string) => {
  const mode = queryString.parse(locationSearch).mode as string;
  switch (mode) {
    case ModeState.Full:
      return ModeState.Full;
    case ModeState.Preview:
      return ModeState.Preview;
    default:
      return config.addons.mode.defaultState;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export const getQuery = (locationSearch: string) => {
  const mode = queryString.parse(locationSearch).mode as string;
  switch (mode) {
    case ModeState.Full:
      return ModeState.Full;
    case ModeState.Preview:
      return ModeState.Preview;
    default:
      return config.addons.mode.defaultState;
  }
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
