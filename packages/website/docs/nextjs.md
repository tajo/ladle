---
id: nextjs
title: Next.js
---

# Next.js

Next.js is a popular React framework that provides a lot of features out of the box. Ladle works well with Next.js, but there are some caveats.

## `next/image`

This component relies on a build-time transformation that Next.js provides. However, Ladle has its own build process. To make `next/image` work, we need to replace it with a simple `<img />` element.

### `vite.config.ts`

```tsx
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "next/image": path.resolve(__dirname, "./.ladle/UnoptimizedImage.tsx"),
    },
  },
});
```

### `.ladle/UnoptimizedImage.tsx`

```tsx
const UnoptimizedImage = (props: any) => {
  return <img {...props} />;
};
export default UnoptimizedImage;
```

This solution is inspired by [blog post](https://sdorra.dev/posts/2023-01-18-ladle-next-image#nextimage).
