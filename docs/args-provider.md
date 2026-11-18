# Module: args-provider

**File:** `\packages\ladle\lib\app\src\args-provider.tsx`

## Overview

Module `args-provider` contains 3 analyzed entities.

```
import * as React from "react";
import { useLadleContext } from "./context";
import { getQuery } from "./addons/control";
import { ActionType, ControlType, ControlState } from "../../shared/types";

const ALLOWED_ARGTYPES = [
  "select",
  "multi-select",
  "radio",
  "inline-radio",
  "background",
  "check",
  "inline-check",
  "range",
  "color",
  "date",
  "number",
  "text",
  "boolean",
];

const ArgsProvider = ({
  component,
  args,
  argTypes,
}: {
  component: any;
  args: any;
  argTypes: any;
}) => {
  const { globalState, dispatch } = useLadleContext();
  const actionLogger = (name: string) => (event: Event) => {
    dispatch({
      type: ActionType.UpdateAction,
      value: { name, event },
      clear: false,
    });
  };
  React.useEffect(() => {
    const controls: ControlState = {};
    let bgControls = 0;
    args &&
      Object.keys(args).forEach((argKey) => {
        const argValue = args[argKey];
        if (globalState.control[argKey]) {
          controls[argKey] = {
            type: globalState.control[argKey].type,
            defaultValue: argValue,
            value: globalState.control[argKey].value,
            description: "",
          };
        } else {
          let type = ControlType.Complex;
          switch (typeof argValue) {
            case "function":
              type = ControlType.Function;
              break;
            case "boolean":
              type = ControlType.Boolean;
              break;
            case "number":
              type = ControlType.Number;
              break;
            case "string":
              type = ControlType.String;
              break;
          }
          controls[argKey] = {
            type,
            defaultValue: argValue,
            value: argValue,
            description: "",
          };
        }
      });
    argTypes &&
      Object.keys(argTypes).forEach((argKey) => {
        const argValue = argTypes[argKey];
        if (argValue && argValue.action) {
        
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `args-provider.ArgsProvider` | function | No description |
| `args-provider.actionLogger` | function | No description |
| `args-provider.mappingValue` | function | No description |

## Git History

- Commits: 18
- Authors: 4
- Bug fixes: 3
- Features: 6

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
