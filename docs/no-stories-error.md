# Module: no-stories-error

**File:** `\packages\ladle\lib\app\src\no-stories-error.tsx`

## Overview

Module `no-stories-error` contains 1 analyzed entities.

```
import { Link } from "./ui";

const NoStoriesError = ({ error }: { error: string }) => {
  console.log(error);
  return (
    <div className="ladle-error-content">
      <h1>SyntaxError when parsing stories ❌</h1>
      <pre>{error}</pre>
      <p>Check the terminal for more info.</p>
      <p>
        <Link href="https://ladle.dev/docs/stories#limitations">
          More information.
        </Link>
      </p>
      <p>
        <strong>Please restart Ladle after fixing this issue.</strong>
      </p>
      <p>
        <Link href="https://github.com/tajo/ladle">Github</Link>
      </p>
      <p>
        <Link href="https://www.ladle.dev">Docs</Link>
      </p>
    </div>
  );
};

export default NoStoriesError;
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `no-stories-error.NoStoriesError` | function | No description |

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
