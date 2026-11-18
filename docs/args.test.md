# Module: args.test

**File:** `\type-tests\args.test.tsx`

## Overview

Module `args.test` contains 1 analyzed entities.

```
import type { Story } from "../packages/ladle/lib/app/exports";

type FooProps = {
  foo: string;
  bar: number;
};

function Foo({ foo, bar }: FooProps) {
  return <div>{foo + bar}</div>;
}

export const Args: Story<FooProps> = Foo;

Args.args = {
  foo: "foo",
  // @ts-expect-error - bar is not a string
  bar: "1",
};

export const Args2: Story<FooProps> = Foo;

Args2.args = {
  foo: "foo",
  bar: 1,
  // @ts-expect-error - baz is not a valid arg
  baz: "baz",
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `args.test.Foo` | function | No description |

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 0
- Features: 3

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
