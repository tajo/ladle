import type * as React from "react";
import queryString from "query-string";
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

export const Button: React.FC<AddonProps> = ({ globalState, dispatch }) => {
  const darkText = "Switch to dark theme.";
  const lightText = "Switch to light theme.";
  return (
    <li>
      <button
        aria-label={
          globalState.theme === ThemeState.Light ? darkText : lightText
        }
        title={globalState.theme === ThemeState.Light ? darkText : lightText}
        onClick={() => {
          const newTheme =
            globalState.theme === ThemeState.Light
              ? ThemeState.Dark
              : ThemeState.Light;
          document.documentElement.setAttribute("data-theme", newTheme);
          dispatch({ type: ActionType.UpdateTheme, value: newTheme });
        }}
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
