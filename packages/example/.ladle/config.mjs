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
  stories: "src/**/mdx.stories.mdx",
  appendToHead: `<style>.append {}</style>`,
};
