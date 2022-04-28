---
id: config
title: Config
---

Ladle does not require any configuration and many features can be controlled through the CLI parameters. However, more advanced setups might require some configuration. In that case, you can add `.ladle/config.mjs` file.

## Story filenames

```tsx
export default {
  stories: "src/**/control.stories.{js,jsx,ts,tsx}",
};
```

This would change the default glob that is used for story discovery

## Import Aliases

Some projects use shortcuts like `@` for the `root` when importing modules. You can define your own import aliases as:

```js
export default {
  resolve: {
    alias: {
      "@": "../src",
    },
  },
};
```

Ladle also respects `paths` and `baseUrl` specified in your [`tsconfig`](https://www.typescriptlang.org/tsconfig#paths).

## Env Variables and Modes

Ladle uses Vite's env variables and exposes it's modes. [Read more](https://vitejs.dev/guide/env-and-mode.html).

Ladle uses [dotenv](https://github.com/motdotla/dotenv) so you can pass variables through `.env` files:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

Loaded env variables are exposed to your client source code via `import.meta.env`. However, to prevent accidentally leaking env variables to the client, only variables prefixed with `VITE_` are exposed to your Ladle/Vite-processed code. This prefix can be customized through the `envPrefix` config parameter.

## Global Constant Replacements

[https://vitejs.dev/config/#define](https://vitejs.dev/config/#define)

Ladle config exposes `define` on the top level (all modes), and in `serve` (dev) and `build` (prod) modes.

## All Options

All settings you can change and their details:

```tsx
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx}",
  root: "./",
  publicDir: "public", // can be an absolute path or `false` to disable the feature
  enableFlow: false, // enable flow types support
  defaultStory: "", // default story id to load, alphabetical by default
  babelPresets: [],
  babelPlugins: [],
  vitePlugins: [], // https://vitejs.dev/config/#plugins
  envPrefix: "VITE_", // can be a string or string[]
  css: {
    modules: {}, // https://vitejs.dev/config/#css-modules
  },
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
    source: {
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

## Common Problems

- Configuration is shared between the Ladle CLI and frontend client so you can't use Node APIs/imports like `path`.
