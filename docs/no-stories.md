# Module: no-stories

**File:** `\packages\ladle\lib\app\src\no-stories.tsx`

## Overview

Module `no-stories` contains 1 analyzed entities.

```
import { config } from "virtual:generated-list";
import { Code, Link } from "./ui";

const NoStories = () => (
  <div className="ladle-error-content">
    <h1>No stories found</h1>
    <p>
      The configured glob pattern for stories is: <Code>{config.stories}</Code>.
    </p>
    <p>
      It can be changed through the{" "}
      <Link href="https://www.ladle.dev/docs/config#story-filenames">
        configuration file
      </Link>{" "}
      or CLI flag <Code>--stories=your-glob</Code>.
    </p>
    <p>
      <Link href="https://github.com/tajo/ladle">GitHub</Link>
    </p>
    <p>
      <Link href="https://www.ladle.dev">Docs</Link>
    </p>
  </div>
);

export default NoStories;
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `no-stories.NoStories` | function | No description |

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 1
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
