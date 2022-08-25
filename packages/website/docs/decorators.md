---
id: decorators
title: Decorators
---

Ladle supports story decorators, so you can wrap all stories in a file with additional React component(s). This is useful if your stories/components rely on [React Context](https://reactjs.org/docs/context.html) and libraries like `react-router` or `redux`. In the example bellow , we are adding an extra `margin: 3em` to each story:

```tsx
import type { StoryDecorator } from "@ladle/react";

export default {
  decorators: [
    (Component) => (
      <div style={{ margin: "3em" }}>
        <Component />
      </div>
    ),
  ] as StoryDecorator[],
};
```

`decorators` is an array, so you can compose multiple components together. You can also set a [global decorator or provider](./providers).

Decorators can be also applied to a specific story:

```tsx
export const MyStory = () => <div>My Story</div>;

MyStory.decorators = [
  (Component) => (
    <div style={{ margin: "3em" }}>
      <Component />
    </div>
  ),
];
```

## Context Parameter

You can also access Ladle's context through the second parameter. This way your decorators can control every aspect of Ladle including the state of controls and other addons:

```tsx
import type { Story, StoryDecorator } from "@ladle/react";

export default {
  decorators: [
    (Component, context) => (
      <div style={{ margin: "3em" }}>
        {context.globalState.control.label.value}
        <Component />
      </div>
    ),
  ] as StoryDecorator[],
};

const Card: Story<{
  label: string;
}> = ({ label }) => <p>Label: {label}</p>;

Card.args = {
  label: "Hello",
};
```
