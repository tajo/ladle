# Module: story-not-found

**File:** `\packages\ladle\lib\app\src\story-not-found.tsx`

## Overview

Module `story-not-found` contains 0 analyzed entities.

```
import { Code, Link } from "./ui";

const StoryNotFound = ({ activeStory }: { activeStory: string }) => (
  <div className="ladle-error-content">
    <h1>Story not found</h1>
    <p>
      The story id <Code>{activeStory}</Code> you are trying to open does not
      exist. Typo?
    </p>
    <p>
      <Link href="/">Back to home</Link>
    </p>
    <p>
      <Link href="https://github.com/tajo/ladle">GitHub</Link>
    </p>
    <p>
      <Link href="https://www.ladle.dev">Docs</Link>
    </p>
  </div>
);

export default StoryNotFound;
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 1
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
