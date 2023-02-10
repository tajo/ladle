---
id: programmatic
title: Programmatic
---

Ladle can be also used through its JavaScript API:

```tsx
import serve from "@ladle/react/serve";
import build from "@ladle/react/build";
import preview from "@ladle/react/preview";

await serve({
  config: ".ladle", // default folder for config.mjs
});
await build({
  config: ".ladle", // default folder for config.mjs
});
await preview({
  config: ".ladle", // default folder for config.mjs
});
```

Explore all config.mjs [options](./config#ladleconfigmjs).
