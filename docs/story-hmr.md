# Module: story-hmr

**File:** `\packages\ladle\lib\app\src\story-hmr.ts`

## Overview

Module `story-hmr` contains 1 analyzed entities.

```
type WatcherT = () => void;

export const watchers: WatcherT[] = [];
export const storyUpdated = () => {
  watchers.forEach((watcher) => watcher());
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `story-hmr.storyUpdated` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
