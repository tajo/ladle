# Module: msw

**File:** `\packages\ladle\lib\app\src\msw.tsx`

## Overview

Module `msw` contains 2 analyzed entities.

```
import * as React from "react";
import type { RequestHandler } from "msw";

const Msw = ({
  children,
  msw,
}: {
  children: React.ReactElement;
  msw: RequestHandler[];
}) => {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const initMsw = async () => {
      if (msw.length > 0) {
        const { setupWorker } = await import("msw/browser");
        if (!window.__ladle_msw) {
          window.__ladle_msw = setupWorker();
          window.__ladle_msw.use(...msw);
          window.__ladle_msw
            .start({
              serviceWorker: {
                url: `${(import.meta as any).env.BASE_URL}mockServiceWorker.js`,
              },
            })
            .then(() => {
              setReady(true);
            });
        } else {
          window.__ladle_msw.use(...msw);
          setReady(true);
        }
      }
    };
    initMsw();
    return () => {
      if (window.__ladle_msw) {
        window.__ladle_msw.resetHandlers();
      }
    };
  }, [msw]);
  if (msw.length === 0) return children;
  if (!ready) return null;
  return children;
};

export default Msw;
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `msw.Msw` | function | No description |
| `msw.initMsw` | function | No description |

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 1
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
