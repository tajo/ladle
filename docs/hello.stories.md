# Module: hello.stories

**File:** `\e2e\provider\src\hello.stories.tsx`

## Overview

Module `hello.stories` contains 2 analyzed entities.

```
import type { Story } from "@ladle/react";
import { useContext } from "react";
import { MyContext } from "../.ladle/components";

export const World: Story = () => {
  const value = useContext(MyContext);
  return <h1>Hello World - {value}</h1>;
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `hello.stories.World` | function | No description |
| `hello.stories.Linked` | function | No description |

## Git History

- Commits: 2
- Authors: 2
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
