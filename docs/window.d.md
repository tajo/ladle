# Module: window.d

**File:** `\packages\ladle\lib\app\window.d.ts`

## Overview

Module `window.d` contains 1 analyzed entities.

```
import type { SetupWorker } from "msw/browser";

declare global {
  interface Window {
    __ladle_msw: SetupWorker;
  }
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `window.d.Window` | interface | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
