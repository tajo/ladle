/**
 * This file is optional.
 *
 * To setup config for specific stories to be included
 *
 * stories: [
 *    "src/a11y.stories.tsx",
 *    "src/control.stories.tsx",
 *    "src/controls.stories.tsx",
 * ],
 *
 *  */

const customLightTheme = {
  plain: {
    color: "black",
    backgroundColor: "hsl(180deg 75.96% 77.9%)",
  },
};

const customDarkTheme = {
  plain: {
    color: "salmon",
    backgroundColor: "#1E1E1E",
  },
};
/** @type {import('@ladle/react').UserConfig} */
export default {
  appendToHead: `<style>.append {}</style>`,
  addons: {
    a11y: {
      enabled: true,
    },
    source: {
      themeLight: customLightTheme,
      themeDark: customDarkTheme,
    },
  },
  expandStoryTree: true,
};
