---
id: typescript
title: TypeScript
---

# TypeScript

Ladle is written in TypeScript and provides first-class support for TypeScript.

## `tsconfig.json`

Ladle uses [jsx-runtime](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) so there is not need to import React at the top of each module. However, you need to let TypeScript know:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "jsx": "react-jsx"
  },
  "include": ["src", ".ladle"]
}
```

## Exported Types

You can import [many types](https://github.com/tajo/ladle/blob/main/packages/ladle/lib/app/exports.ts#L52-L115) from `@ladle/react` to improve your development experience:

```ts
import type { StoryDefault, Story } from "@ladle/react";

type Props = { label: string };

export default {
  title: "New title",
} satisfies StoryDefault<Props>;

const Card: Story<Props> = ({ label }) => <p>Label: {label}</p>;
Card.args = {
  label: "Hello",
};
```
