# Module: meta.test

**File:** `\type-tests\meta.test.tsx`

## Overview

Module `meta.test` contains 1 analyzed entities.

```
import type { Story } from "../packages/ladle/lib/app/exports";

type FooProps = {
  foo: string;
  bar: number;
};

function Foo({ foo, bar }: FooProps) {
  return <div>{foo + bar}</div>;
}

export const Meta: Story<FooProps> = Foo;

// @ts-expect-error - meta is not a valid arg
Meta.meta = "foo";

export const Meta2: Story<FooProps> = Foo;

Meta2.meta = {};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `meta.test.Foo` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
