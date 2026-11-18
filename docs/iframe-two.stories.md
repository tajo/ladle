# Module: iframe-two.stories

**File:** `\packages\example\src\iframe-two.stories.tsx`

## Overview

Module `iframe-two.stories` contains 1 analyzed entities.

```
import { useEffect, useRef } from "react";

export default {
  meta: {
    iframed: true,
  },
};

export const AutoFocusInputAgain = () => {
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
| `iframe-two.stories.AutoFocusInputAgain` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
