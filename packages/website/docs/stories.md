---
id: stories
title: Stories
---

Stories are the entrypoint to your components. They are simple modules that export your components and can add aditional meta data to describe and parametrize them. You can create them anywhere in your project's `src/` folder and they should be named as `*.stories.jsx` or `*.stories.tsx`. Ladle searches your project and loads all the stories into a single playground so you can develop and test them.

## Navigation and Routes

Ladle automatically creates sidebar navigation and routes based on the filenames and names of exported stories:

`src/my-components.stories.tsx`:

```tsx
export const Button = () => <button>My Button</button>;
export const HeaderOne = () => <h1>Header</h1>;
```

`src/my-components--lists.stories.tsx`:

```tsx
export const Simple = () => (
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
);
```

Ladle creates three different routes and a tree navigation while following some simple naming conventions:

- First letter is capitalized
- CamelCase is split into spaces
- `-` turns into a space
- `--` turns into a nested story

![Story Tree Navigation](/img/story-navigation.png)

## Name Customization

Sometimes it might be useful to ignore file/export names and set a custom name explicitly. A single story can be renamed as:

```tsx
export const Button = () => <button>My Button</button>;
Button.storyName = "Renamed Button";
```

All story names and titles [need to be string literals](#limitations).

You can also replace the filename (level name) part:

```tsx
export default {
  title: "Level / Sub level",
};
export const Button = () => <button>My Button</button>;
```

`/` can be used to create sub-levels. This creates following navigation structure:

```
Level
  └─ Sub level
      └─ Button
```

## Decorators

Ladle supports story decorators so you can wrap all stories in file with additional React component(s). This can be very useful if your stories/components rely on [React Context](https://reactjs.org/docs/context.html) and libraries like `react-router` or `redux`. In the example bellow , we are adding an extra `margin: 3em` to each story:

```tsx
export default {
  decorators: [
    (Story: React.FC) => (
      <div style={{ margin: "3em" }}>
        <Story />
      </div>
    ),
  ],
};
```

`decorators` is an array so you can compose multiple components together. You can also set a [global decorator or provider](./providers).

## Controls, Args and ArgTypes

Stories can be parametrized. You can define the props that your component expects and then update them through the UI without changing the code or creating multiple additional stories with the same component. The example bellow covers all available `args` and `argTypes` that Ladle currently supports:

```tsx
import type { Story } from "@ladle/react";

export const Controls: Story<{
  label: string;
  disabled: boolean;
  count: number;
  colors: string[];
  variant: string;
  size: string;
}> = ({ count, disabled, label, colors, variant, size }) => (
  <>
    <p>Count: {count}</p>
    <p>Disabled: {disabled ? "yes" : "no"}</p>
    <p>Label: {label}</p>
    <p>Colors: {colors.join(",")}</p>
    <p>Variant: {variant}</p>
    <p>Size: {size}</p>
  </>
);

Controls.args = {
  label: "Hello world",
  disabled: false,
  count: 2,
  colors: ["Red", "Blue"],
};
Controls.argTypes = {
  variant: {
    options: ["primary", "secondary"],
    control: { type: "radio" },
    defaultValue: "primary",
  },
  size: {
    options: ["small", "medium", "big", "huuuuge"],
    control: { type: "select" },
  },
};
```

Ladle detects `args` / `argTypes` and provides the Control UI so you can update the component without touching the code. You can define primitive types through `args` and enums through `argTypes`:

![Controls](/img/controls.png)

You can also create multiple stories by assigning different default `args` / `argTypes` to the same component:

```tsx
import type { Story } from "@ladle/react";

const Card: Story<{
  label: string;
}> = ({ label }) => <p>Label: {label}</p>;

export const CardHello = Card.bind({});
CardHello.args = {
  label: "Hello",
};

export const CardWorld = Card.bind({});
CardWorld.args = {
  label: "World",
};
```

## Limitations

There are limitations in place to support features like the automatic code-splitting or [meta](./meta) file. Some parts of the stories syntax must be static and serializable.

### `storyName`, `title` and `meta` need to be serializable

```tsx
export default {
  title: "Welcome",
  meta: {
    key: "value",
  },
};
export const Story = () => "Hey";
Story.storyName = "Renamed";
```

however, this does not work

```tsx
export default {
  title: "Welcome" + " Everybody",
  meta: {
    key: 1 + 2,
  },
};
export const Story = () => "Hey";
const newName = "Renamed";
Story.storyName = newName;
```

### Story names and files need to be unique

File names and named exports (or storyNames) are [normalized](#navigation-and-routes) and used together as an unique identifier for each story. There cannot be two stories with the same ID. If that occurs, Ladle tells you what stories and files are clashing and you need to rename something.
