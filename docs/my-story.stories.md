# Module: my-story.stories

**File:** `\packages\example\src\my-story.stories.tsx`

## Overview

Module `my-story.stories` contains 2 analyzed entities.

```
import { useState } from "react";
import type { Story } from "@ladle/react";

export const Big: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>Middle fam</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};

export const Ski: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>Yellowasd</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `my-story.stories.Big` | function | No description |
| `my-story.stories.Ski` | function | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
