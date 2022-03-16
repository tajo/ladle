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
