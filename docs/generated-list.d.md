# Module: generated-list.d

**File:** `\packages\ladle\types\generated-list.d.ts`

## Overview

Module `generated-list.d` contains 0 analyzed entities.

```
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
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 5
- Authors: 2
- Bug fixes: 0
- Features: 4

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
