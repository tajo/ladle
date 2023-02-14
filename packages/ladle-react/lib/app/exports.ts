import type * as React from "react";
import type { Args, ArgTypes, Meta as MetaType } from "@ladle/core";

import { useLadleContext } from "./src/context";
import {
  GlobalState,
  ActionType,
  Config,
  GlobalAction,
  ModeState,
  StoryDecorator,
  ThemeState,
} from "@ladle/core/shared/types";

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
  storyMeta?: MetaType;
}>;

export interface Story<P = {}> extends React.FC<P> {
  args?: Args<P>;
  argTypes?: ArgTypes<P>;
  decorators?: StoryDecorator[];
  meta?: MetaType;
  storyName?: string;
}
