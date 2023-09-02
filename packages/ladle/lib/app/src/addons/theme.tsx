import queryString from "query-string";
import { useHotkeys } from "react-hotkeys-hook";
import config from "../get-config";
import { Bulb } from "../icons";
import { ThemeState, AddonProps, ActionType } from "../../../shared/types";

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
