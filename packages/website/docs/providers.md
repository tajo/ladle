---
id: providers
title: Providers
---

Your components might need some global [React Context Provider](https://reactjs.org/docs/context.html#contextprovider). This is typically used for localization, state sharing or routing. You can add a provider to individual stories through [decorators](/docs/decorators). You can also create a global provider by adding `.ladle/components.tsx` (or `.ts`, `.jsx`, or `.js`):

```tsx title=".ladle/components.tsx"
import type { GlobalProvider } from "@ladle/react";

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => (
  <>
    <h1>Theme: {globalState.theme}</h1>
    <h2>{storyMeta.customValue}</h2>
    {children}
  </>
);
```

Now, all stories will have the same heading. The global provider also has access to the `globalState` (the addon state) so you can set your providers based on light vs dark theme or RTL and `storyMeta` to access the [story metadata](/docs/meta).

## Ladle Context

> **Warning**: This is an experimental API that can be changed or removed with any release.

Ladle exports the `useLadleContext` hook that gives you full access to the whole internal `globalState` and a `dispatch` function, so you can also modify it within your stories. For example, your story can inspect and change the Ladle theme. It can control all other addons as well. Example:

```tsx
import { useLadleContext, ActionType, ThemeState } from "@ladle/react";

export const StoryChangingTheTheme = () => {
  const { globalState, dispatch } = useLadleContext();
  return (
    <>
      <p>Active theme: {globalState.theme}</p>
      <button
        onClick={() =>
          dispatch({
            type: ActionType.UpdateTheme,
            value:
              globalState.theme === ThemeState.Dark
                ? ThemeState.Light
                : ThemeState.Dark,
          })
        }
      >
        Switch theme
      </button>
    </>
  );
};
```
