# Module: types

**File:** `\packages\ladle\lib\shared\types.ts`

## Overview

Module `types` contains 1 analyzed entities.

```
import { PrismTheme } from "prism-react-renderer";
import type { UserConfig as ViteUserConfig } from "vite";

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type ActionState = any[];

export type StoryOrder = string[] | ((stories: string[]) => string[]);

export enum ModeState {
  Full = "full",
  Preview = "preview",
}

export enum ThemeState {
  Light = "light",
  Dark = "dark",
  Auto = "auto",
}

export enum ControlType {
  Boolean = "boolean",
  String = "string",
  Number = "number",
  Complex = "complex",
  Function = "function",
  Radio = "radio",
  InlineRadio = "inline-radio",
  Select = "select",
  MultiSelect = "multi-select",
  Check = "check",
  InlineCheck = "inline-check",
  Action = "action",
  Range = "range",
  Background = "background",
}

export type ControlState = {
  [key: string]: {
    name?: string;
    description?: string;
    defaultValue?: any;
    max?: number;
    min?: number;
    step?: number;
    options?: string[];
    value: any;
    type?: ControlType;
    labels?: { [key: string]: string };
  };
};

export enum ActionType {
  UpdateAll = "update-all",
  UpdateMode = "update-mode",
  UpdateAction = "update-action",
  UpdateRtl = "update-rtl",
  UpdateSource = "update-source",
  UpdateStory = "update-story",
  UpdateTheme = "update-theme",
  UpdateWidth = "update-width",
  UpdateControl = "update-control",
  UpdateControlIntialized = "update-control-initialized",
  UpdateHotkeys = "update-hotkeys",
}

export type GlobalAction =
  | {
      type: ActionType.UpdateAll;
      value: GlobalState;
    }
  | {
      type: ActionType.UpdateMode;
      value: ModeState;
    }
  | {
      type: ActionType.UpdateAction;
      clear: boolean;
      value: any;
    }
  | {
      type: ActionType.UpdateRtl;
      value: boolean;
    }
  | {
      type: ActionType.UpdateSource;
      value: boolean;
    }
  | {
      type: ActionType.UpdateWidth;
      value: number;
    }
  | {
      type: ActionType.Updat
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `types.KnownMeta` | interface | No description |

## Git History

- Commits: 22
- Authors: 10
- Bug fixes: 3
- Features: 18

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
