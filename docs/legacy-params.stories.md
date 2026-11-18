# Module: legacy-params.stories

**File:** `\e2e\decorators\src\legacy-params.stories.tsx`

## Overview

Module `legacy-params.stories` contains 0 analyzed entities.

```
import type { StoryDefault, Story } from "@ladle/react";

export default {
  args: {
    flag: "czech",
  },
  argTypes: {
    size: {
      options: ["small", "medium", "big", "huuuuge"],
      control: { type: "select" }, // or type: multi-select
    },
  },
  parameters: {
    one: 1,
    two: 2,
  },
  decorators: [
    (Stories: React.FC, context) => {
      console.log(context);
      return (
        <>
          Decorator {context.parameters.one}
          {context.args.flag}
          <Stories />
        </>
      );
    },
    (Stories: React.FC, context) => (
      <>
        Decorator {context.parameters.two}
        <Stories />
      </>
    ),
  ],
} satisfies StoryDefault;

export const World: Story = () => {
  return <h2>world</h2>;
};

World.parameters = {
  two: 5,
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
