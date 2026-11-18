# Module: context

**File:** `\packages\ladle\lib\app\src\context.ts`

## Overview

Module `context` contains 1 analyzed entities.

```
import * as React from "react";
//@ts-ignore
import LadleContext from "@ladle/react-context";
import type { GlobalAction, GlobalState } from "../../shared/types";

export const Context: React.Context<{
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}> = LadleContext;

export const useLadleContext = () =>
  React.useContext<{
    globalState: GlobalState;
    dispatch: React.Dispatch<GlobalAction>;
  }>(LadleContext);
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `context.Context` | function | No description |

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 1
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
