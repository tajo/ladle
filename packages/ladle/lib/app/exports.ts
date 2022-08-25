import type * as React from "react";
import { useLadleContext } from "./src/context";
import {
  StoryDecorator,
  ActionType,
  GlobalState,
  ThemeState,
  ModeState,
  GlobalAction,
  Config,
} from "../shared/types";

type ReactNodeWithoutObject =
  | React.ReactElement
  | string
  | number
  | boolean
  | null
  | undefined;

export { useLadleContext, ActionType, ThemeState, ModeState };
export type { StoryDecorator };

export const useLink = () => {
  const { dispatch } = useLadleContext();
  return (value: string) => dispatch({ type: ActionType.UpdateStory, value });
};

export type GlobalProvider = React.FC<{
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
  config: Config;
  children: ReactNodeWithoutObject;
}>;

export interface Story<P = {}> extends React.FC<P> {
  storyName?: string;
  parameters?: any;
  meta?: any;
  args?: Args;
  argTypes?: ArgTypes;
  decorators?: StoryDecorator[];
}
export interface Args {
  [key: string]: any;
}

export interface ArgType {
  name?: string;
  description?: string;
  defaultValue?: any;
  [key: string]: any;
}

export interface ArgTypes {
  [key: string]: ArgType;
}
