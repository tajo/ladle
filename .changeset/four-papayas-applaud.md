---
"@ladle/react": minor
---

## Global `args` and `argTypes`

You can now define global args and argTypes in `.ladle/components.tsx`:

```tsx
export const args = {
  test: true,
};

export const argTypes = {
  cities: {
    control: { type: "select" },
    options: ["NYC", "London", "Tokyo"],
  },
};
```

These will be applied to all stories in your project and can be overriden on the story level.

## Background Control

Introducing a new special control type `background`. You can use it to change the background color of your stories. You might want to place it into `.ladle/components.tsx` so it's available to all stories. There can be only one active background control.

```tsx
export const argTypes = {
  background: {
    control: { type: "background" },
    options: ["purple", "blue", "white", "pink"],
    defaultValue: "purple",
  },
};
```

## Control Name and Labels

You can now customize the name and labels of your controls and their options:

```tsx
Story.argTypes = {
  airports: {
    name: "International Airports",
    control: {
      type: "select",
      labels: {
        sfo: "San Francisco",
        lax: "Los Angeles",
        prg: "Prague",
      },
    },
    options: ["sfo", "lax", "prg"],
  },
};
```

## Deterministic `meta.json`

Stories are now sorted in the `meta.json` file in a deterministic way. Useful when creating a hash of the Ladle's output for caching purposes.
