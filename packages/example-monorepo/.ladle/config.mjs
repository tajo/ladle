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

export default {
  appendToHead: `<style>.append {}</style>`,
  addons: {
    a11y: {
      enabled: true,
    },
  },
  stories: [
    "package1/src/**/*.stories.{js,jsx,ts,tsx}",
    "package2/src/**/*.stories.{js,jsx,ts,tsx}",
  ],
  packages: [
    "package1/src/**/*.stories.{js,jsx,ts,tsx}",
    "package2/src/**/*.stories.{js,jsx,ts,tsx}",
  ],
};
