---
id: links
title: Links
---

You can link story from another story:

```tsx
import * as React from "react";
import { linkTo } from "@ladle/react";
import type { Story } from "@ladle/react";

export const Link: Story = () => {
  return <button onClick={linkTo("controls--first")}>Controls</button>;
};
```

The id used `controls--first` is what you find in the URL as the `?story=` parameter.
