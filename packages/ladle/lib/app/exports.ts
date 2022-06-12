import * as React from "react";
import { useLadleState } from "./src/context";
import { ActionType, GlobalState } from "../shared/types";

type ReactNodeWithoutObject =
  | React.ReactElement
  | string
  | number
  | boolean
  | null
  | undefined;

export { useLadleState };

export const useLink = () => {
  const [, dispatch] = useLadleState();
  return (value: string) => dispatch({ type: ActionType.UpdateStory, value });
};

export type GlobalProvider = React.FC<{
  globalState: GlobalState;
  children: ReactNodeWithoutObject;
}>;

/**
 * @see https://ladle.dev/docs/stories
 */
export interface Story<P = {}> extends React.FC<P> {
  storyName?: string;
  parameters?: any;
  meta?: any;
  args?: Args<P>;
  argTypes?: ArgTypes<P>;
}

export type Args<P> = Partial<P>;

/**
 * @see https://ladle.dev/docs/stories#controls-args-and-argtypes
 */
export type ArgType<T> = {
  name?: string;
  description?: string;
  defaultValue?: T;
} & ArgOptionType<T>;

export type ArgOptionType<T> = {
  options: T[];
  control: { type: "radio" | "select" };
};

export type ArgTypes<P = {}> = {
  [AP in keyof P]?: ArgType<P[AP]>;
};
