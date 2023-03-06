---
id: stories
title: Stories
---

Stories are the entrypoint to your components. They are simple modules that export your components and can add additional metadata to describe and parametrize them. You can create them anywhere in your project's `src/` folder; they should be named as `*.stories.jsx` or `*.stories.tsx`. Ladle searches your project and loads all the stories into a single playground so you can develop and test them.

## Navigation and Routes

Ladle automatically creates sidebar navigation and routes based on the filenames and names of exported stories:

`src/my-components.stories.tsx`:

```tsx
import type { Story } from "@ladle/react";

export const Button: Story = () => <button>My Button</button>;
export const HeaderOne: Story = () => <h1>Header</h1>;
```

`src/my-components--lists.stories.tsx`:

```tsx
import type { Story } from "@ladle/react";

export const Simple: Story = () => (
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
import type { Story } from "@ladle/react";

export const Button: Story = () => <button>My Button</button>;
Button.storyName = "Renamed Button";
```

All story names and titles [need to be string literals](#limitations).

You can also replace the filename (level name) part:

```tsx
import type { StoryDefault, Story } from "@ladle/react";

export default {
  title: "Level / Sub level",
} satisfies StoryDefault;
export const Button: Story = () => <button>My Button</button>;
```

`/` can be used to create sublevels. This creates following navigation structure:

```
Level
  └─ Sub level
      └─ Button
```

## Limitations

There are limitations in place to support features like the automatic code-splitting or [meta](./meta) file. Some parts of the stories' syntax must be static and serializable.

### `storyName`, `title` and `meta` need to be serializable

```tsx
import type { StoryDefault, Story } from "@ladle/react";

export default {
  title: "Welcome",
  meta: {
    key: "value",
  },
} satisfies StoryDefault;
export const Renamed: Story = () => "Hey";
Renamed.storyName = "Renamed";
```

however, this does not work

```tsx
import type { StoryDefault, Story } from "@ladle/react";

export default {
  title: "Welcome" + " Everybody",
  meta: {
    key: 1 + 2,
  },
} satisfies StoryDefault;
export const Renamed: Story = () => "Hey";
const newName = "Renamed";
Renamed.storyName = newName;
```

### Story names and files need to be unique

File names and named exports (or storyNames) are [normalized](#navigation-and-routes) and used together as a unique identifier for each story. There cannot be two stories with the same ID. If that occurs, Ladle tells you what stories and files are clashing and you need to rename something.
