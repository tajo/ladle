---
id: config
title: Config
---

Ladle does not require any configuration and many features can be controlled through the CLI parameters. However, more advanced setups might require some configuration. In that case, you can add `.ladle/config.mjs` file:

```tsx
export default {
  stories: "src/**/control.stories.{js,jsx,ts,tsx}",
};
```

This would change the default glob that is used for story discovery. All settings you can change and their details:

```tsx
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx}",
  root: process.cwd(),
  defaultStory: "", // default story id to load, alphabetical by default
  babelPresets: [],
  babelPlugins: [],
  define: {}, // https://vitejs.dev/config/#define
  resolve: {
    alias: {}, // https://vitejs.dev/config/#resolve-alias
  },
  optimizeDeps: {
    include: [], // https://vitejs.dev/config/#optimizedeps-include
  },
  // enable/disable addons and their default state
  addons: {
    control: {
      enabled: true,
      defaultState: {},
    },
    theme: {
      enabled: true,
      defaultState: "light",
    },
    mode: {
      enabled: true,
      defaultState: "full",
    },
    rtl: {
      enabled: true,
      defaultState: false,
    },
    ladle: {
      enabled: true,
    },
  },
  serve: {
    open: "**Default**", // browser to open, none to open nothing
    port: 61000,
    define: {}, // https://vitejs.dev/config/#define for dev build
  },
  build: {
    out: "build",
    sourcemap: false,
    baseUrl: "/",
    define: {}, // https://vitejs.dev/config/#define for prod build
  },
};
```
