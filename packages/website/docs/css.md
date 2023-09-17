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

## Tailwind

There is a working [example](https://github.com/tajo/ladle/blob/main/e2e/css/src/hello.stories.tsx#L11). You need to install `tailwindcss` and create

```js title="postcss.config.js"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

and

```js title="tailwind.config.js"
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  variants: {},
  plugins: [],
};
```

## Emotion

Add these dependencies

```sh
pnpm add @emotion/react @swc/plugin-emotion @vitejs/plugin-react-swc
```

And create

```js title="vite.config.js"
import react from "@vitejs/plugin-react-swc";

export default {
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      plugins: [["@swc/plugin-emotion", {}]],
    }),
  ],
};
```

## Styled-components

Styled-components work out of the box but it's highly recommended to install the optional plugin.

```sh
pnpm add styled-components @swc/plugin-styled-components @vitejs/plugin-react-swc
```

And create

```js title="vite.config.js"
import react from "@vitejs/plugin-react-swc";

export default {
  plugins: [
    react({
      plugins: [["@swc/plugin-styled-components", {}]],
    }),
  ],
};
```

## BaseWeb and Styletron

```sh
pnpm add baseui styletron-react styletron-engine-monolithic
```

and create a global provider:

```js title=".ladle/components.tsx"
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-monolithic";
import { LightTheme, DarkTheme, BaseProvider } from "baseui";
import type { GlobalProvider } from "@ladle/react";

const engine = new Styletron();

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <StyletronProvider value={engine}>
    <BaseProvider
      theme={{
        ...(globalState.theme === "dark" ? DarkTheme : LightTheme),
        direction: globalState.rtl ? "rtl" : "ltr",
      }}
    >
      {children}
    </BaseProvider>
  </StyletronProvider>
);
```

This will setup [BaseWeb](https://baseweb.design) component library, [Styletron](https://styletron.org/) and integrates Dark/Light themes with Ladle.
