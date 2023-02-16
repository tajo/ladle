---
id: typescript
title: TypeScript
---

# TypeScript

Ladle is written in TypeScript and provides first-class support for TypeScript.

## `tsconfig.json`

Ladle uses [jsx-runtime](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) so there is not need to import React at the top of each module. However, you need to let TypeScript know, `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx"
  },
  "include": ["src", ".ladle"]
}
```

## Exported Types

You can export many types from `@ladle/react` to improve your development experience:

```tsx
import type {
  Story,
  StoryDecorator,
  Args,
  ControlType,
  ArgType,
  ArgTypes,
  Meta,
} from "@ladle/react";

export const Welcome: Story<{ label: string }> = ({ label }) => <h1>Label</h1>;
Welcome.args = {
  label: "Hello World",
};
```
