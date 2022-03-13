---
id: links
title: Links
---

You can link story from another story:

```tsx
import * as React from "react";
import { useLink } from "@ladle/react";

export const Link = () => {
  const to = useLink();
  return <button onClick={() => to("controls--first")}>Controls</button>;
};
```

The id used `controls--first` is what you find in the URL as the `?story=` parameter.
