# theme.changeTheme

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\theme.tsx` (lines 24-31)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
    const newTheme =
      globalState.theme === ThemeState.Light
        ? ThemeState.Dark
        : ThemeState.Light;
    document.documentElement.setAttribute("data-theme", newTheme);
    dispatch({ type: ActionType.UpdateTheme, value: newTheme });
  }
```

## Docstring

_No docstring provided._

## Source

```
  const changeTheme = () => {
    const newTheme =
      globalState.theme === ThemeState.Light
        ? ThemeState.Dark
        : ThemeState.Light;
    document.documentElement.setAttribute("data-theme", newTheme);
    dispatch({ type: ActionType.UpdateTheme, value: newTheme });
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
