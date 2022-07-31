import * as React from "react";
import queryString from "query-string";
import { Moon, Sun } from "../icons";
import { ThemeState, AddonProps, ActionType } from "../../../shared/types";
import Tooltip from "@reach/tooltip";

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
  const { theme } = globalState;
  const isLightTheme = theme === ThemeState.Light;

  const label = isLightTheme ? "Switch to Dark theme" : "Switch to Light theme";
  const Icon = isLightTheme ? Sun : Moon;

  const handleClick = () => {
    const newTheme = isLightTheme ? ThemeState.Dark : ThemeState.Light;
    document.documentElement.setAttribute("data-theme", newTheme);
    dispatch({ type: ActionType.UpdateTheme, value: newTheme });
  };

  return (
    <li>
      <Tooltip label={label}>
        <button onClick={handleClick}>
          <Icon />
        </button>
      </Tooltip>
    </li>
  );
};
