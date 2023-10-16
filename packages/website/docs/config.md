---
id: config
title: Config
---

Ladle does not require any configuration and some features can be controlled through CLI parameters. However, more advanced setups might require some configuration. There are a few different files you can create and use:

- [`.ladle/components.tsx`](./providers), used in browser only to enhance your stories or provide them a context
- `.ladle/config.mjs`, used in browser and CLI to configure things like the story search pattern or addons visibility
- `.ladle/head.html`, injects additional HTML into the `<head>` of Ladle. Can be handy to load additional fonts or stylesheets. Alternative to the [appendToHead](#appendtohead) parameter.
- [`vite.config.{js|mjs|ts}`](https://vitejs.dev/config/#config-file-resolving), used only by Vite (CLI node environment) to change any parameters of the compilation (things like aliasing, dependency pre-bundling, babel plugins...) and some aspects of the dev server (open browser on start...). You should get familiar with Vite docs!

## vite.config.{js|mjs|ts}

- **[Documentation](https://vitejs.dev/config).**
- The parameter `root` is replaced so Ladle can function properly.
- [`server.port`](https://vitejs.dev/config/#server-port) and [`build.outDir`](https://vitejs.dev/config/#build-outdir) are overridden by Ladle as well, so they can be configured separately from your main project since you probably don't want them to clash.
- Vite config assumes that paths are relative to the project root; however, Ladle's root is buried in `node_modules`. You should always use absolute paths. Ladle tries to resolve relative paths relative to the project root but that doesn't work when configuring custom plugins for example.
- Ladle adds [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) and [vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths) plugins by default. If you need to customize them (for example adding babel presets into the React plugin), you can add them for yourself and Ladle will use yours.

## `.ladle/config.mjs`

### stories

We use [globby](https://github.com/sindresorhus/globby), go there to learn about all possible search patterns. Ladle uses this parameter to find story files in your project.

The entry of stories supports string or array of strings

String:

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx,mdx}",
};
```

Array of strings:

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: ["src/**/control.stories.{js,jsx,ts,tsx}", "src/stories.custom.tsx"],
};
```

### host

Specify the dev server host.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  host: "0.0.0.0",
};
```

### previewHost

Specify the preview server host.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  previewHost: "0.0.0.0",
};
```

### port

Specify the dev server port.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  port: 61000,
};
```

### previewPort

Specify the preview server port.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  previewPort: 8080,
};
```

### outDir

Specify the output directory (relative to the project root).

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  outDir: "build",
};
```

### defaultStory

Change which story is loaded when Ladle starts. It's the `?story=` portion of URL. The default value is `""` - open the first story in alphabetical order. Must be serializable.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  defaultStory: "a11y--welcome",
};
```

### storyOrder

Change the order of stories in the navigation . By default, stories are sorted alphabetically where "folders" have priority over individual stories. You should supply an array of story IDs (as used in the URL) or a function that returns such an array. Must be serializable.

#### Default setting

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  // note that alphabetically sorted stories are provided
  storyOrder: (stories) => stories,
};
```

#### Using an array

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  storyOrder: ["folder--story1", "folder--story2"],
};
```

#### Using an function

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  storyOrder: () => ["folder--story1", "folder--story2"],
};
```

A wildcard can be used in both cases to match and sort multiple stories at once. For example, `["folder*"]` will match all stories starting with `"folder"` and sorts them alphabetically.

#### Additional rules

- If you omit a story from the output array, it will not be visible.
- If you specify a story ID that does not exist, an error will be thrown.
- The result array is de-duplicated.

### viteConfig

Override the path for the [Vite config](https://vitejs.dev/config). By default, `vite.config.{js|mjs|ts}` and `vite.config.ts` in the project root are being checked.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  viteConfig: process.cwd() + "/ladle-vite.config.ts",
};
```

### base

Base path for building the output; useful for e.g. hosting your project's storybook on GitHub Pages. Must be serializable.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  base: "/my-project/",
};
```

### mode

Vite [mode](https://vitejs.dev/guide/env-and-mode.html#modes). If not set, defaults to `development` when developing and `production` for building static output.

This also affects [Vite's .env file loading](https://vitejs.dev/guide/env-and-mode.html#env-files), as well as anything else setting `mode` affects. Must be serializable.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  mode: "my-custom-mode",
};
```

### appendToHead

You can inject additional HTML into the `<head>` of Ladle:

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  appendToHead: "<style>h1 {color:pink}</style>",
};
```

The same effect can be achieved by creating a file `.ladle/head.html`.

You can use this to modify the [Ladle's UI](https://github.com/tajo/ladle/blob/main/packages/ladle/lib/app/ladle.css), for example to remove margins around the stories:

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  appendToHead: `<style>
    :root {--ladle-main-padding: 0; --ladle-main-padding-mobile: 0;}
  </style>`,
};
```

Or to move the side navigation to the left:

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  appendToHead: `<style>
    .ladle-wrapper { flex-direction: row-reverse; }
  </style>`,
};
```

### hotkeys

You can customize the default set of hotkeys. You can assign multiple hotkeys for the same action. An emtpy array disables the hotkey. Use `meta` for `cmd` on macOS and `win` on Windows. `alt` is option on macOS.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  hotkeys: {
    search: ["/", "meta+p"],
    nextStory: ["alt+arrowright"],
    previousStory: ["alt+arrowleft"],
    nextComponent: ["alt+arrowdown"],
    previousComponent: ["alt+arrowup"],
    control: ["c"],
    darkMode: ["d"],
    fullscreen: ["f"],
    width: ["w"],
    rtl: ["r"],
    source: ["s"],
    a11y: ["a"],
  },
};
```

### addons

You can enable or disable all Ladle addons (the buttons in the left bottom corner). You can also control their default state. Must be serializable.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  addons: {
    a11y: {
      enabled: false,
    },
    action: {
      enabled: false,
      defaultState: [],
    },
    control: {
      enabled: true,
      defaultState: {},
    },
    ladle: {
      enabled: true,
    },
    mode: {
      enabled: true,
      defaultState: "full",
    },
    msw: {
      enabled: false,
    },
    rtl: {
      enabled: true,
      defaultState: false,
    },
    source: {
      enabled: true,
      defaultState: false,
    },
    theme: {
      enabled: true,
      defaultState: "light",
    },
    width: {
      enabled: true,
      options: {
        xsmall: 414,
        small: 640,
        medium: 768,
        large: 1024,
      },
      defaultState: 0,
    },
  },
};
```

### noWatch

Disable the file system watcher when running the `serve` cli command.

```js
/** @type {import('@ladle/react').UserConfig} */
export default {
  noWatch: true,
};
```
