import { useLadleContext, ActionType, ThemeState } from "@ladle/react";

const empty = "";
export const Issues = () => {
  const { globalState, dispatch } = useLadleContext();
  return (
    <>
      <input />
      <button style={{ backgroundColor: `red${empty}`, color: "darkRed" }}>
        Inaccessible button
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ActionType.UpdateTheme,
            value:
              globalState.theme === ThemeState.Dark
                ? ThemeState.Light
                : ThemeState.Dark,
          })
        }
      >
        Switch theme
      </button>
      <p style={{ background: "white" }}>Theme: {globalState.theme}</p>
      <img />
    </>
  );
};
