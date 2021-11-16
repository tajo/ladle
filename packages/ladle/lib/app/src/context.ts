import * as React from "react";
import {
  GlobalAction,
  GlobalState,
  ThemeState,
  ModeState,
} from "../../shared/types";

export const Context = React.createContext<{
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}>({
  globalState: {
    theme: ThemeState.Light,
    mode: ModeState.Full,
    story: "",
    rtl: false,
  },
  dispatch: () => {},
});

export const useLadleState = (): [
  GlobalState,
  React.Dispatch<GlobalAction>,
] => {
  const { globalState, dispatch } = React.useContext(Context);
  return [globalState, dispatch];
};
