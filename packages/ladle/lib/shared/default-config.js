/**
 * @type {import('../shared/types').Config}
 */
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx}",
  defaultStory: "", // default story id to load, alphabetical by default
  viteConfig: undefined,
  port: 61000,
  outDir: "build",
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
    ladle: {
      enabled: true,
    },
  },
};
