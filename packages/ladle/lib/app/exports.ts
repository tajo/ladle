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

export { useMDXComponents } from "@mdx-js/react";
export const Story = (props: any) => props.children;
export const Meta = (props: any) => props.children;
export const Description = (props: any) => props.children;

type ReactNodeWithoutObject =
  | React.ReactElement
  | string
  | number
  | boolean
  | null
  | undefined;

export { useLadleContext, ActionType, ThemeState, ModeState };
export type { StoryDecorator };

// deprecated, linkTo is just easier to use
export const useLink = () => {
  const { dispatch } = useLadleContext();
  return (value: string) => dispatch({ type: ActionType.UpdateStory, value });
};

export const linkTo = (value: string) => {
  const dispatch = (window as any)
    .ladleDispatch as React.Dispatch<GlobalAction>;
  return () => dispatch({ type: ActionType.UpdateStory, value });
};

export const action = (name: string) => {
  const dispatch = (window as any)
    .ladleDispatch as React.Dispatch<GlobalAction>;
  return (event: any) =>
    dispatch({
      type: ActionType.UpdateAction,
      value: { name, event },
      clear: false,
    });
};

export type GlobalProvider = React.FC<{
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
  config: Config;
  children: ReactNodeWithoutObject;
  storyMeta?: any;
}>;

export interface Story<P = {}> extends React.FC<P> {
  storyName?: string;
  parameters?: any;
  meta?: any;
  args?: Args<P>;
  argTypes?: ArgTypes<P>;
  decorators?: StoryDecorator[];
}

export type Args<
  P = {
    [key: string]: any;
  },
> = Partial<P>;

export type ControlType =
  | "select"
  | "multi-select"
  | "radio"
  | "inline-radio"
  | "check"
  | "inline-check";

export interface ArgType<K = any> {
  control?: {
    options?: K[];
    type: ControlType;
    [key: string]: any;
  };
  defaultValue?: any;
  description?: string;
  name?: string;
  [key: string]: any;
}

export type ArgTypes<
  P = {
    [key: string]: any;
  },
> = {
  [key in keyof P]?: ArgType<P[key]>;
};
