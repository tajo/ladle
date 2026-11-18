# Module: my-story--sec.stories

**File:** `\packages\example\src\my-story--sec.stories.tsx`

## Overview

Module `my-story--sec.stories` contains 2 analyzed entities.

```
import type { Story } from "@ladle/react";
import { useState } from "react";

export const Lol: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>LOL fam</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};

export const Ok: Story = () => {
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
| `my-story--sec.stories.Lol` | function | No description |
| `my-story--sec.stories.Ok` | function | No description |

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
