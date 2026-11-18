# Module: storyname.stories

**File:** `\packages\example\src\storyname.stories.tsx`

## Overview

Module `storyname.stories` contains 3 analyzed entities.

```
import type { Story } from "@ladle/react";

export const Cat: Story = () => {
  const Stop = { storyName: "" };
  // should be ignored
  Stop.storyName = "What";
  return <h1>Cat</h1>;
};

Cat.storyName = "Doggo";
// @ts-expect-error
Cat.foo = "Ha";

export const CapitalCity: Story = () => {
  return <h1>DC</h1>;
};

export const CapitalReplaced: Story = () => {
  return <h1>CapitalReplaced</h1>;
};
CapitalReplaced.storyName = "Champs Élysées";
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `storyname.stories.Cat` | function | No description |
| `storyname.stories.CapitalReplaced` | function | No description |
| `storyname.stories.CapitalCity` | function | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
