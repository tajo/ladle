# theme.Button

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\theme.tsx` (lines 21-59)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({ globalState, dispatch }: AddonProps) => {
  const darkText = "Switch to dark theme.";
  const lightText = "Switch to light theme.";
  const changeTheme = () => {
    const newTheme =
      globalState.theme === ThemeState.Light
        ? ThemeState.Dark
        : ThemeState.Light;
    document.documentElement.setAttribute("data-theme", newTheme);
    dispatch({ type: ActionType.UpdateTheme, value: newTheme });
  };
  useHotkeys(config.hotkeys.darkMode, changeTheme, {
    enabled: globalState.hotkeys && config.addons.mode.enabled,
  });
  return (
    <li>
      <button
        aria-label={
          globalState.theme === ThemeState.Light ? darkText : lightText
        }
        title={globalState.theme === ThemeState.Light ? darkText : lightText}
        onClick={changeTheme}
        type="button"
      >
        <Bulb />
        <span className="ladle-addon-tooltip">
          {globalState.theme === ThemeState.Light ? darkText : lightText}
        </span>
        <label>
          Switch to{" "}
          {globalState.theme === ThemeState.Light
            ? ThemeState.Dark
            : ThemeState.Light}{" "}
          theme
        </label>
      </button>
    </li>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const Button = ({ globalState, dispatch }: AddonProps) => {
  const darkText = "Switch to dark theme.";
  const lightText = "Switch to light theme.";
  const changeTheme = () => {
    const newTheme =
      globalState.theme === ThemeState.Light
        ? ThemeState.Dark
        : ThemeState.Light;
    document.documentElement.setAttribute("data-theme", newTheme);
    dispatch({ type: ActionType.UpdateTheme, value: newTheme });
  };
  useHotkeys(config.hotkeys.darkMode, changeTheme, {
    enabled: globalState.hotkeys && config.addons.mode.enabled,
  });
  return (
    <li>
      <button
        aria-label={
          globalState.theme === ThemeState.Light ? darkText : lightText
        }
        title={globalState.theme === ThemeState.Light ? darkText : lightText}
        onClick={changeTheme}
        type="button"
      >
        <Bulb />
        <span className="ladle-addon-tooltip">
          {globalState.theme === ThemeState.Light ? darkText : lightText}
        </span>
        <label>
          Switch to{" "}
          {globalState.theme === ThemeState.Light
            ? ThemeState.Dark
            : ThemeState.Light}{" "}
          theme
        </label>
      </button>
    </li>
  );
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
