---
id: stories
title: Stories
---

Stories are the entrypoint to your components. They are simple modules that export your components and can add additional metadata to describe and parametrize them. You can create them anywhere in your project's `src/` folder; they should be named as `*.stories.jsx` or `*.stories.tsx`. Ladle searches your project and loads all the stories into a single playground so you can develop and test them.

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

File names and named exports (or storyNames) are [normalized](#navigation-and-routes) and used together as a unique identifier for each story. There cannot be two stories with the same ID. If that occurs, Ladle tells you what stories and files are clashing and you need to rename something.
