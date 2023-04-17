import * as React from "react";
//@ts-ignore
import LadleContext from "@ladle/react-context";
import config from "./get-config";
import type { GlobalAction, GlobalState } from "../../shared/types";

export const Context: React.Context<{
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}> = LadleContext;

export const useLadleContext = () => ({
  ...React.useContext<{
    globalState: GlobalState;
    dispatch: React.Dispatch<GlobalAction>;
  }>(LadleContext),
  config,
});
