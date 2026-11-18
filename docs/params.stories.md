# Module: params.stories

**File:** `\e2e\decorators\src\params.stories.tsx`

## Overview

Module `params.stories` contains 2 analyzed entities.

```
import type { StoryDefault, Story } from "@ladle/react";

export default {
  title: "Root / Examples",
  meta: {
    drink: "coke",
    food: "burger",
  },
} satisfies StoryDefault;

export const First: Story = () => {
  return <h1>first</h1>;
};

export const Second: Story = () => {
  return <h1>second</h1>;
};
Second.storyName = "Second Renamed";
Second.meta = {
  drink: "water",
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `params.stories.First` | function | No description |
| `params.stories.Second` | function | No description |

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 0
- Features: 2

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
