/**
 * @type {import('../shared/types').Config}
 */
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx}",
  defaultStory: "", // default story id to load, alphabetical by default
  storyOrder: (stories) => stories, // default is alphabetical
  viteConfig: undefined,
  appendToHead: "",
  port: 61000,
  previewPort: 8080,
  outDir: "build",
  base: undefined,
  onDevServerStart: () => {
    return;
  },
  i18n: {
    buildTooltip: '💡 Tip: Run "ladle preview" to check that the build works!',
  },
  // enable/disable addons and their default state
  addons: {
    control: {
      enabled: true,
      defaultState: /** @type {import('../shared/types').ControlState} */ ({}),
    },
    theme: {
      enabled: true,
      defaultState: /** @type {import('../shared/types').ThemeState} */ (
        "light"
      ),
    },
    mode: {
      enabled: true,
      defaultState: /** @type {import('../shared/types').ModeState} */ ("full"),
    },
    rtl: {
      enabled: true,
      defaultState: false,
    },
    source: {
      enabled: true,
      defaultState: false,
    },
    a11y: {
      enabled: true,
    },
    action: {
      enabled: true,
      defaultState: [],
    },
    ladle: {
      enabled: true,
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
