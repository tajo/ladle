# Module: decorators.test

**File:** `\type-tests\decorators.test.tsx`

## Overview

Module `decorators.test` contains 5 analyzed entities.

```
import type { Story, StoryDecorator } from "../packages/ladle/lib/app/exports";

type FooProps = {
  foo: string;
  bar: number;
};

function Foo({ foo, bar }: FooProps) {
  return <div>{foo + bar}</div>;
}

const decorator: StoryDecorator<FooProps> = (Component) => (
  <div>
    <Component />
  </div>
);

export const Decorators: Story<FooProps> = Foo;

Decorators.decorators = [decorator];

const decoratorWithValidProps: StoryDecorator<FooProps> = (Component) => (
  <div>
    <Component foo="foo" />
  </div>
);

export const DecoratorsWithOptionalProps: Story<FooProps> = Foo;

DecoratorsWithOptionalProps.decorators = [decoratorWithValidProps];

const decoratorWithInvalidProps: StoryDecorator<FooProps> = (Component) => (
  <div>
    {/* @ts-expect-error - 5 is a number, foo is a string */}
    <Component foo={5} />
  </div>
);

export const DecoratorsWithInvalidProps: Story<FooProps> = Foo;

DecoratorsWithInvalidProps.decorators = [decoratorWithInvalidProps];

const decoratorWithNoProps: StoryDecorator = (Component) => (
  <div>
    <Component />
  </div>
);

export const DecoratorsWithNoProps: Story<FooProps> = Foo;

Decorators.decorators = [decoratorWithNoProps];
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `decorators.test.Foo` | function | No description |
| `decorators.test.decorator` | function | No description |
| `decorators.test.decoratorWithNoProps` | function | No description |
| `decorators.test.decoratorWithInvalidProps` | function | No description |
| `decorators.test.decoratorWithValidProps` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 1
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
