---
id: background
title: Background
---

You can set the background color of the story canvas through a special [control](./controls) with type `background`:

```tsx title=".ladle/components.tsx"
export const argTypes = {
  background: {
    control: { type: "background" },
    options: ["purple", "blue", "white", "pink"],
    defaultValue: "purple",
  },
};
```

This will make it accessible to all stories through the standard control's UI. You can also set it per story level as other controls and even override the global settings:

```tsx title="src/hello.stories.tsx"
export const Story = () => <div>Hello</div>;
Story.argTypes = {
  background: {
    name: "Canvas background",
    control: { type: "background" },
    options: ["green", "yellow", "pink"],
    defaultValue: "pink",
  },
};
```

Note that there can be only one active background control.
