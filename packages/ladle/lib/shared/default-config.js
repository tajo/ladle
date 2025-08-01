import { themes } from "prism-react-renderer";

/**
 * @type {import('../shared/types').Config}
 */
export default {
  stories: "src/**/*.stories.{js,jsx,ts,tsx,mdx}",
  defaultStory: "", // default story id to load, alphabetical by default
  storyOrder: (stories) => stories, // default is alphabetical
  viteConfig: undefined,
  appendToHead: "",
  disableHttp2: false,
  noWatch: false,
  port: 61000,
  previewPort: 8080,
  hmrHost: undefined,
  hmrPort: undefined,
  outDir: "build",
  base: undefined,
  expandStoryTree: false,
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
      themeDark: {
        ...themes.nightOwl,
        plain: {
          ...themes.nightOwl.plain,
          backgroundColor: "var(--ladle-bg-color-secondary)",
        },
      },
      themeLight: {
        ...themes.github,
        plain: {
          ...themes.github.plain,
          backgroundColor: "var(--ladle-bg-color-secondary)",
        },
      },
    },
    a11y: {
      enabled: false,
    },
    msw: {
      enabled: false,
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
