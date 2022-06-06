import path from "path";

let root = "/";
let publicDir = "public";

try {
  root = process.cwd();
  publicDir = path.join(process.cwd(), "public");
} catch (e) {}

/**
 * @type {import('../shared/types').Config}
 */
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx}",
  root,
  publicDir,
  enableFlow: false, // enable support for flow types
  defaultStory: "", // default story id to load, alphabetical by default
  babelParserOpts: {},
  babelPresets: [],
  babelPlugins: [],
  vitePlugins: [],
  define: {}, // https://vitejs.dev/config/#define
  envPrefix: "VITE_",
  css: {
    modules: {},
  },
  // see resolve section at https://vitejs.dev/config
  resolve: {},
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
    minify: false,
  },
};
