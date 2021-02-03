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
      return (import.meta as any).env.SNOWPACK_PUBLIC_LADLE_THEME as ThemeState;
  }
};

export const Button: React.FC<AddonProps> = ({ globalState, dispatch }) => {
  return (
    <li>
      <button
        aria-label="Switch between light and dark theme"
        title="Switch between light and dark theme"
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
