let root = "/";
try {
  root = process.cwd();
} catch (e) {}

/**
 * @type {import('../shared/types').Config}
 */
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx}",
  root,
  defaultStory: "",
  babelPresets: [],
  babelPlugins: [],
  define: {},
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
    ladle: {
      enabled: true,
    },
  },
  serve: {
    open: "**Default**",
    port: 61000,
    output: "dashboard",
    define: {},
  },
  build: {
    out: "build",
    sourcemap: false,
    baseUrl: "/",
    define: {},
  },
};
