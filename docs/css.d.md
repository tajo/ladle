# Module: css.d

**File:** `\css.d.ts`

## Overview

Module `css.d` contains 0 analyzed entities.

```
// Ambient declarations so `tsc` accepts CSS imports that are handled by the
// bundler (Vite) at runtime. TypeScript 6 reports unresolved side-effect
// imports (TS2882), so a bare `import "./styles.css"` needs a module shim.
declare module "*.css";

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
