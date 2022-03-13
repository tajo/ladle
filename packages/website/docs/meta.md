---
id: meta
title: Meta
---

Ladle exports `meta.json` with the list of all stories and some additional information. In the `serve` mode, it is accessible as `http://localhost:61000/meta.json` and `build` just outputs `meta.json` into the build folder. Example:

```json
{
  "about": {
    "homepage": "https://www.ladle.dev",
    "github": "https://github.com/tajo/ladle",
    "version": 1
  },
  "stories": {
    "control--first": {
      "name": "First",
      "levels": ["Control"],
      "locStart": 12,
      "locEnd": 12,
      "filePath": "src/control.stories.tsx",
      "meta": {}
    }
  }
}
```

You can also add some additional annotations to each story (or stories) through its `meta` parameter. It needs to be statically analyzable. `control.stories.tsx`:

```tsx
export default {
  meta: {
    baseweb: "test",
    browsers: ["chrome"],
  },
};

export const First = () => <h1>First</h1>;
First.meta = {
  browsers: ["firefox"],
};
```

```json
{
  "stories": {
    "control--first": {
      "name": "First",
      "levels": ["Control"],
      "locStart": 8,
      "locEnd": 8,
      "filePath": "src/control.stories.tsx",
      "meta": { "baseweb": "test", "browsers": ["firefox"] }
    }
  }
}
```

This is very useful for further automatization. For example, you can load this file in your CI and create visual snapshots for each story.

## Testing

If you use Ladle for end to end testing with framework as [Playwright](https://playwright.dev/), make sure that your story is fully loaded before you run the test. Stories are code-splitted and loaded later in the process. Ladle adds `data-storyloaded` attribute to the `<html>` tag so you can `await` it:

```tsx
await page.waitForSelector("[data-storyloaded]");
```
