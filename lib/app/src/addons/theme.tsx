import queryString from "query-string";
import history from "../history";
import { Bulb } from "../icons";
import { ThemeState, GlobalState } from "../../../shared/types";

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

export const Button: React.FC<{ globalState: GlobalState }> = ({
  globalState,
}) => {
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
          const params = queryString.parse(location.search);
          params["theme"] = newTheme;
          document.documentElement.setAttribute("data-theme", newTheme);
          history.push(`?${queryString.stringify(params)}`);
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
