---
id: source
title: Story Source
---

You can preview the source code of the active story and its origin.

![Story Source Code](/img/story-source.png)

## Hyperlink

You can customize the header of the source addon through `.ladle/components.tsx`:

```tsx
import type { SourceHeader } from "@ladle/react";
export const StorySourceHeader: SourceHeader = ({ path }) => {
  return (
    <b>
      Github link? <code className="ladle-code">{path}</code>
    </b>
  );
};
```

This might be useful if you want provide a hyperlink.
