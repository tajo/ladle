---
id: providers
title: Providers
---

Your components might need some global [React Context Provider](https://reactjs.org/docs/context.html#contextprovider). This is typically used for localization, state sharing or routing. You can add a provider to individual stories through [decorators](./stories#decorators). However, you can also create a global provider by adding `.ladle/components.tsx` (or `.js`):

```tsx
import type { GlobalProvider } from "@ladle/react";

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <>
    <h1>Theme: {globalState.theme}</h1>
    {children}
  </>
);
```

Now, all stories will have the same heading. The global provider also has access to the `globalState` (the addon state) so you can set your providers based on light vs dark theme or RTL.
