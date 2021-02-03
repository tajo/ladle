/**
 * @type {import('../shared/types').Config}
 */
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx}",
  defaultStory: "",
  mount: [],
  addons: {
    theme: {
      enabled: true,
      defaultState: /** @type {import('../shared/types').ThemeState} */ ("light"),
    },
    mode: {
      enabled: true,
      defaultState: /** @type {import('../shared/types').ModeState} */ ("full"),
    },
    rtl: {
      enabled: true,
      defaultState: false,
    },
  },
  serve: {
    open: "**Default**",
    port: 61000,
    output: "dashboard",
  },
  build: {
    out: "build",
    sourcemap: false,
    baseUrl: "/",
    optimize: false,
  },
};
