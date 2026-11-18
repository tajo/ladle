# Module: width.stories

**File:** `\e2e\addons\src\width.stories.tsx`

## Overview

Module `width.stories` contains 3 analyzed entities.

```
import type { Story } from "@ladle/react";
import "./styles.css";

export const Iframed: Story = () => <h1>Iframed</h1>;
Iframed.meta = {
  iframed: true,
};

export const NoIframe: Story = () => <h1>No Iframe</h1>;

export const SetCustom: Story = () => <h1>Width set</h1>;
SetCustom.meta = {
  width: 555,
};

export const SetSmall: Story = () => <h1>Width set</h1>;
SetSmall.meta = {
  width: "small",
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `width.stories.Iframed` | function | No description |
| `width.stories.NoIframe` | function | No description |
| `width.stories.SetSmall` | function | No description |

## Git History

- Commits: 2
- Authors: 2
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
