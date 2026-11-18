# Module: hello.show

**File:** `\e2e\config-ts\src\hello.show.tsx`

## Overview

Module `hello.show` contains 2 analyzed entities.

```
import type { Story } from "@ladle/react";

declare const __filename_root: string;
declare const __dirname_root: string;
declare const __filename_myPlugin: string;
declare const __dirname_myPlugin: string;

export const World: Story = () => {
  return (
    <div>
      <h1>Hello World</h1>

      <dl>
        <dt>filename root</dt>
        <dd data-test="filename_root">{__filename_root}</dd>

        <dt>dirname root</dt>
        <dd data-test="dirname_root">{__dirname_root}</dd>

        <dt>filename myPlugin</dt>
        <dd data-test="filename_myPlugin">{__filename_myPlugin}</dd>

        <dt>dirname myPlugin</dt>
        <dd data-test="dirname_myPlugin">{__dirname_myPlugin}</dd>
      </dl>
    </div>
  );
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `hello.show.World` | function | No description |
| `hello.show.Styles` | function | No description |

## Git History

- Commits: 2
- Authors: 2
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
