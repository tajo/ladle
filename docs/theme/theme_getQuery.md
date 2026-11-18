# theme.getQuery

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\theme.tsx` (lines 7-19)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(locationSearch: string) => {
  const theme = queryString.parse(locationSearch).theme as string;
  switch (theme) {
    case ThemeState.Light:
      return ThemeState.Light;
    case ThemeState.Dark:
      return ThemeState.Dark;
    case ThemeState.Auto:
      return ThemeState.Auto;
    default:
      return (import.meta as any).env.VITE_PUBLIC_LADLE_THEME as ThemeState;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export const getQuery = (locationSearch: string) => {
  const theme = queryString.parse(locationSearch).theme as string;
  switch (theme) {
    case ThemeState.Light:
      return ThemeState.Light;
    case ThemeState.Dark:
      return ThemeState.Dark;
    case ThemeState.Auto:
      return ThemeState.Auto;
    default:
      return (import.meta as any).env.VITE_PUBLIC_LADLE_THEME as ThemeState;
  }
};
```

## Git History

- Commits: 4
- Authors: 2
- Bug fixes: 0
- Features: 2

## Callers

None

## Callees

None
