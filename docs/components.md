# Module: components

**File:** `\e2e\provider\.ladle\components.tsx`

## Overview

Module `components` contains 0 analyzed entities.

```
import type { GlobalProvider, SourceHeader } from "@ladle/react";
import { createContext } from "react";

export const MyContext = createContext("my-context");

export const Provider: GlobalProvider = ({ children, storyMeta }) => (
  <MyContext.Provider value="some-context">
    {storyMeta?.myMeta && <p id="myMeta">{storyMeta.myMeta}</p>}
    {children}
    <p>rendered by provider</p>
  </MyContext.Provider>
);

//@ts-ignore
const config: string = LADLE_PROJECT_PATH;

export const StorySourceHeader: SourceHeader = ({ path, locStart, locEnd }) => {
  return (
    <span id="source-header">
      {config}
      {path}
      {locStart}-{locEnd}
    </span>
  );
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 4
- Authors: 2
- Bug fixes: 0
- Features: 3

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
