---
"test-config": minor
"@ladle/react": minor
---

Fix config file to support entry files of array of strings

The `.ladle/config.mjs` files now supports array of strings for stories

```tsx
// array of strings
export default {
  stories: ["src/**/control.stories.{js,jsx,ts,tsx}", "src/stories.custom.tsx"],
};
```
