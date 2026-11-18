# Module: my-blah.stories

**File:** `\packages\example\src\my-blah.stories.tsx`

## Overview

Module `my-blah.stories` contains 3 analyzed entities.

```
import type { StoryDefault, Story } from "@ladle/react";
import { useState } from "react";

export default {
  title: "Demo",
  meta: {
    baseweb: "test",
    browsers: ["chrome"],
  },
  decorators: [
    (Story: React.FC) => (
      <div style={{ margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
} satisfies StoryDefault;

export const Middle: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>Newish haha</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
Middle.storyName = "Middle Man";

export const Opo2: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>coze opo Middle Muhaha tadaokok opsops</h1>
      <input />
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};

export const Dayum: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>opo Middle Muhaha tada</h1>
      <input />
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
| `my-blah.stories.Middle` | function | No description |
| `my-blah.stories.Opo2` | function | No description |
| `my-blah.stories.Dayum` | function | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
