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
  return (event: any = undefined) =>
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
  storyMeta?: Meta;
}>;

export type SourceHeader = React.FC<{
  path: string;
  locStart: number;
  locEnd: number;
}>;

export type StoryDefault<P = {}> = {
  args?: Args<P>;
  argTypes?: ArgTypes<P>;
  decorators?: StoryDecorator<P>[];
  meta?: Meta;
  title?: string;
  parameters?: { [key: string]: any };
};

export interface Story<P = {}> extends React.FC<P> {
  args?: Args<P>;
  argTypes?: ArgTypes<P>;
  decorators?: StoryDecorator<P>[];
  meta?: Meta;
  storyName?: string;
  parameters?: { [key: string]: any };
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
  | "inline-check"
  | "background"
  | "color"
  | "date"
  | "number"
  | "text"
  | "boolean"
  | "range";

export interface ArgType<K = any> {
  control?: {
    name?: string;
    labels?: { [key: string]: string };
    type: ControlType;
    min?: number;
    max?: number;
    step?: number;
    [key: string]: any;
  };
  mapping?: { [key: string | number]: any };
  options?: K[] | unknown;
  defaultValue?: K;
  description?: string;
  name?: string;
  action?: string;
  [key: string]: any;
}

export type ArgTypes<
  P = {
    [key: string]: any;
  },
> = {
  [key in keyof P]?: ArgType<P[key]>;
};

export type Meta = {
  iframed?: boolean;
  width?: number | "xsmall" | "small" | "medium" | "large";
  [key: string]: any;
};
