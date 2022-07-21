---
id: config
title: Config
---

Ladle does not require any configuration and some features can be controlled through the CLI parameters. However, more advanced setups might require some configuration. There are three different files you can create and use:

- [`.ladle/components.tsx`](./providers), used in browser only to enhance your stories or provide them a context
- `.ladle/config.mjs`, used in browser and CLI to configure things like the story search pattern or addons visibility
- [`vite.config.{js|mjs|ts}`](https://vitejs.dev/config/#config-file-resolving), used only by Vite (CLI node environment) to change any parameters of the compilation (things like aliasing, dependency pre-bundling, babel plugins...) and some aspects of the dev server (open browser on start...). You should get familiar with Vite docs!

## vite.config.{js|mjs|ts}

- **[Documentation](https://vitejs.dev/config).**
- The parameter `root` is replaced so Ladle can function properly.
- [`server.port`](https://vitejs.dev/config/#server-port) and [`build.outDir`](https://vitejs.dev/config/#build-outdir) are overridden by Ladle as well so they can be configured separately from your main project since you probably don't want them to clash.
- Vite config assumes that paths are relative to the project root; however, Ladle's root is buried in `node_modules`. You should always use absolute paths. Ladle tries to resolve relative paths relative to the project root but that doesn't work when configuring custom plugins for example.
- Ladle adds [@vitejs/plugin-react](https://www.npmjs.com/package/@vitejs/plugin-react) and [vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths) plugins by default. If you need to customize them (for example adding babel presets into the react plugin), you can add them for yourself and Ladle will use yours.

## `.ladle/config.mjs`

### stories

We use [globby](https://github.com/sindresorhus/globby), go there to learn about all possible search patterns. Ladle uses this parameter to find story files in your project.

```tsx
export default {
  stories: "src/**/control.stories.{js,jsx,ts,tsx}",
};
```

### port

Specify the dev server port.

```tsx
export default {
  port: 61000,
};
```

### previewPort

Specify the preview server port.

```tsx
export default {
  previewPort: 8080,
};
```

### outDir

Specify the output directory (relative to project root).

```tsx
export default {
  outDir: "build",
};
```

### defaultStory

You can change what story is loaded when Ladle starts. It's the `?story=` portion of URL. The default value is `""` - open the first story in alphabetical order.

```tsx
export default {
  defaultStory: "a11y--welcome",
};
```

### viteConfig

Alternative path for the [Vite config](https://vitejs.dev/config). By default, `vite.config.{js|mjs|ts}` and `vite.config.ts` in the project root are being checked.

```tsx
export default {
  viteConfig: process.cwd() + "/ladle-vite.config.ts",
};
```

### addons

You can enable or disable all Ladle addons (the buttons in the left bottom corner). You can also control their default state.

```tsx
export default {
  addons: {
    a11y: {
      enabled: true,
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
