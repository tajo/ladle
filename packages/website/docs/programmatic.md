---
id: programmatic
title: Programmatic
---

Ladle can be also used through its JavaScript API:

```tsx
import serve from "@ladle/react/api/serve.js";
import build from "@ladle/react/api/build.js";

await serve({
  /* config */
});
await build({
  /* config */
});
```

Both commands accept all [configuration options](./config).
