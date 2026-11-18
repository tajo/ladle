# Module: control.stories

**File:** `\packages\example\src\control.stories.tsx`

## Overview

Module `control.stories` contains 1 analyzed entities.

```
import type { Story } from "@ladle/react";

const Card: Story<{
  label: string;
}> = ({ label }) => <p>Label: {label}</p>;

export const CardHello = Card.bind({});

CardHello.args = {
  label: "Hello",
};

export const CardWorld = Card.bind({});
CardWorld.args = {
  label: "World",
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `control.stories.Card` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
