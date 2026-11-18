# Module: query-parameters.stories

**File:** `\packages\example\src\query-parameters.stories.tsx`

## Overview

Module `query-parameters.stories` contains 1 analyzed entities.

```
import type { Story } from "@ladle/react";
import { useEffect, useState } from "react";

export const QueryParameters: Story = () => {
  const [queryParams, setQueryParams] = useState<string>("");

  useEffect(() => {
    setQueryParams(location.search);
  }, [location.search]);

  return <p>Params: {queryParams}</p>;
};

QueryParameters.decorators = [
  (Component) => {
    useEffect(() => {
      const url = new URL(window.location.href);
      url.searchParams.set("foo", "bar");
      history.pushState({}, "", url);
    }, []);

    return (
      <>
        <Component />
      </>
    );
  },
];
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `query-parameters.stories.QueryParameters` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
