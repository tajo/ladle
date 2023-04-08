import * as React from "react";
import { GlobalState, GlobalAction, Config } from "../lib/shared/types";
import { Args, ArgTypes } from "../lib/app/exports";

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
  export const args: Args;
  export const argTypes: ArgTypes;
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
    storyMeta?: any;
  }>;
  export const StorySourceHeader: React.FC<{
    path: string;
    locStart: number;
    locEnd: number;
  }>;
}
