# Module: exports

**File:** `\packages\ladle\lib\app\exports.ts`

## Overview

Module `exports` contains 10 analyzed entities.

```
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
  KnownMeta,
  MetaJson as BaseMetaJson,
  MetaJsonStory as BaseMetaJsonStory,
} from "../shared/types";

import * as msw from "msw";
export { msw };

export type { UserConfig } from "../shared/types";
export * as ui from "./src/ui";
export * as dialog from "./src/dialog";
export * as icons from "./src/icons";
export { useMDXComponents } from "@mdx-js/react";
export const Story = (props: any) => props.children;
export const Meta = (props: any) => props.children;
export const Description = (props: any) => props.children;

type ReactNodeWithoutObject =
  React.ReactElement | string | number | boolean | null | undefined;

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

export type { GlobalAction, GlobalState };

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

export interface StoryDefault<P = {}> {
  args?: Args<P>;
  argTypes?: A
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `exports.Story` | function | No description |
| `exports.useLink` | function | No description |
| `exports.linkTo` | function | No description |
| `exports.Description` | function | No description |
| `exports.Meta` | function | No description |
| `exports.action` | function | No description |
| `exports.StoryDefault` | interface | No description |
| `exports.Meta` | interface | No description |
| `exports.ArgType` | interface | No description |
| `exports.Story` | interface | No description |

## Git History

- Commits: 28
- Authors: 8
- Bug fixes: 2
- Features: 17

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
