---
id: programmatic
title: Programmatic
---

Ladle can be also used through its JavaScript API:

```tsx
import serve from "@ladle/react/serve";
import build from "@ladle/react/build";

await serve({
  /* config */
});
await build({
  /* config */
});
```

Both commands accept all [configuration options](./config#ladleconfigmjs).
