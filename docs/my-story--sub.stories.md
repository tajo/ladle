# Module: my-story--sub.stories

**File:** `\packages\example\src\my-story--sub.stories.tsx`

## Overview

Module `my-story--sub.stories` contains 2 analyzed entities.

```
import type { Story } from "@ladle/react";
import { useState } from "react";

export const Middle: Story = () => {
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

export const Yellow: Story = () => {
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
| `my-story--sub.stories.Middle` | function | No description |
| `my-story--sub.stories.Yellow` | function | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
