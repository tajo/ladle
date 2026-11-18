# Module: control

**File:** `\packages\ladle\lib\app\src\addons\control.tsx`

## Overview

Module `control` contains 4 analyzed entities.

```
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Controls } from "../icons";
import { Modal } from "../ui";
import config from "../get-config";
import queryString from "query-string";
import type { AddonProps } from "../../../shared/types";
import {
  ActionType,
  ControlState,
  ControlType,
  GlobalAction,
  GlobalState,
} from "../../../shared/types";

const getInputType = (type?: ControlType) => {
  switch (type) {
    case ControlType.Boolean:
      return "checkbox";
    case ControlType.Number:
      return "number";
    case ControlType.Range:
      return "range";
    default:
      return "text";
  }
};

const getInputValue = (target: HTMLInputElement, type?: ControlType) => {
  switch (type) {
    case ControlType.Boolean:
      return target.checked;
    case ControlType.Number:
    case ControlType.Range:
      return parseFloat(target.value);
    default:
      return target.value;
  }
};

const coerceString = (value: string, options?: any[]) => {
  if (options && options.some((option) => option === Number(value))) {
    return Number(value);
  }
  const isBoolean = value === "true" || value === "false";
  return isBoolean ? (value === "false" ? false : true) : value;
};

export const getQuery = (
  locationSearch: string,
  controlState: ControlState,
) => {
  const params = queryString.parse(locationSearch);
  const controls: { [key: string]: any } = {};
  // we first need controls being initialized from stories so we know types
  // before taking over from url
  if (Object.keys(controlState).length === 0) {
    return controlState;
  }
  Object.keys(params).forEach((paramKey) => {
    if (paramKey.startsWith("arg-") && controlState[paramKey.split("-")[1]]) {
      const keyParts = paramKey.split("-");
      const argKey = keyParts[1];
      const argValue = params[paramKey] as string;
      const argType = controlState[argKey].type;
      if (argType !== ControlType.Action) {
        let realValue: any = arg
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `control.getInputType` | function | No description |
| `control.getInputValue` | function | No description |
| `control.getQuery` | function | No description |
| `control.coerceString` | function | No description |

## Git History

- Commits: 14
- Authors: 5
- Bug fixes: 1
- Features: 7

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
