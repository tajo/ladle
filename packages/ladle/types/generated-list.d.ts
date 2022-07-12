import * as React from "react";
import { GlobalState, GlobalAction, Config } from "../lib/shared/types";

type ReactNodeWithoutObject =
  | React.ReactElement
  | string
  | number
  | boolean
  | null
  | undefined;

declare module "virtual:generated-list" {
  export const list: string[];
  export const config: Config;
  export const errorMessage: string;
  export const stories: {
    [key: string]: {
      entry: string;
      locStart: number;
      locEnd: number;
      component: React.FC;
      meta: any;
    };
  };
  export const storySource: { [key: string]: string };
  export const Provider: React.FC<{
    globalState: GlobalState;
    dispatch: React.Dispatch<GlobalAction>;
    config: Config;
    children: ReactNodeWithoutObject;
    storyWindow: Window;
  }>;
}
