# Module: iframe.stories

**File:** `\packages\example\src\iframe.stories.tsx`

## Overview

Module `iframe.stories` contains 1 analyzed entities.

```
import { useEffect, useRef } from "react";

export default {
  meta: {
    iframed: true,
  },
};

export const Page = () => <div>Page</div>;
export const PageB = () => <div>Page B</div>;
export const PageC = () => <div>Page C</div>;
export const AutoFocusInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} />;
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `iframe.stories.Page` | function | No description |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
