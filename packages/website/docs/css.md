---
id: css
title: CSS
---

You can import CSS files directly into your components or stories:

```js
import "./styles.css";
```

If you want to use your stylesheet across all stories, you can create `.ladle/components.tsx` file and import it there. This file can be also used to specify a [global provider](/docs/providers). That can be useful for CSS-in-JS solutions.

## CSS Modules

Any CSS file ending with `.module.css` is considered a [CSS modules file](https://github.com/css-modules/css-modules). Importing such a file will return the corresponding module object:

```css
/* example.module.css */
.red {
  color: red;
}
```

```tsx
import type { Story } from "@ladle/react";
import classes from "./example.module.css";

export const MyStory: Story = () => {
  return <h1 className={classes.red}>Red Header</h1>;
};
```

## PostCSS

If the project contains valid PostCSS config (any format supported by [postcss-load-config](https://github.com/postcss/postcss-load-config), e.g. `postcss.config.js`), it will be automatically applied to all imported CSS.

Ladle just defaults to [Vite's CSS handling](https://vitejs.dev/guide/features.html#css).
