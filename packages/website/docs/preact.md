---
id: preact
title: preact
---

# Preact Support

[Preact](https://preactjs.com) is a popular React alternative with the same API but a much smaller footprint. It is possible to use Ladle in a Preact setup with a few caveats and some configuration changes.


First, you will need to install the preact plugin for vite

```
npm install @preact/preset-vite
```

### Vite config

Next, you'll need to customize Vite's config. Place it in the root directory of your project. If you want to place the vite config file somewhere else, make sure to add the path in your ladle config with the `viteConfig` option.

```tsx title="vite.config.ts"
import path from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  alias: {
    react: "preact/compat",
  },
  plugins: [
    preact({
      prefreshEnabled: true,
    }),
  ],
});
```

## Ladle config

Finally, you must disable the inclusion of the the react plugin for vite. This is to prevent issues between fast-refresh and prefresh.

```js title=".ladle/config.mjs"
export default {
  disableReactPlugin: true,
  viteConfig: "{path/to/viteConfig.js}" // only need this if you did not put it in the root
}
```

## Caveats

An error will be thrown on every rerender if using Preact and the Ladle width plugin. You can turn off this plugin by providing the following option in your ladle config:

```js title=".ladle/config.mjs"
export default {
  disableReactPlugin: true,
  addons: {
    width: {
      enabled: false,
    },
  }
}
```
