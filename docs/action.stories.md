# Module: action.stories

**File:** `\e2e\addons\src\action.stories.tsx`

## Overview

Module `action.stories` contains 1 analyzed entities.

```
import type { Story } from "@ladle/react";
import { action } from "@ladle/react";

export const Basic: Story<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <>
      <button id="args-button" onClick={onClick}>
        Args
      </button>
      <button id="manual-button" onClick={action("second")}>
        Manual
      </button>
    </>
  );
};

Basic.argTypes = {
  onClick: {
    action: "clicked",
  },
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `action.stories.Basic` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
