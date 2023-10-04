---
id: addons
title: Addons
---

Ladle currently does not support third-party addons, but it might in the future. For now, it comes with a set of default addons you can find in the bottom left corner (button icons):

- [Accessibility](./a11y) (Axe)
- [Background](./background)
- [Controls](./controls) (only if `args` or `argTypes` are defined)
- Dark theme
- [Links](./links)
- [MSW](./msw) (API mocking)
- Preview mode
- Right-to-left
- [Story source code](./source)
- [Width](./width)

There are also other features you might not even notice at first:

- Addons and all their state is persisted through the URL. That's useful for sharing or testing a specific story state. The browser navigation works as expected.
- **Ladle is accessible**. If you want to build an accessible component, the wrapping environment should be accessible and keyboard friendly too. That's why your story comes first and the side navigation / addons second.
- **Ladle is responsive**. There is no addon for different viewports. Just use your browser's dev tools.
- Ladle is a single application with no iframes but is careful to not affect your stories in unintended ways. This makes the build faster and smaller and debugging through _Elements_ more straightforward.
- Ladle code-splits stories by default.
- React Fast Refresh is enabled by default.

## Storybook interoperability

Ladle currently supports or partially supports most major features of the [Component Story Format](https://storybook.js.org/docs/react/api/csf). We are long-time users of Storybook, and it is our priority to make the transition between the two tools as seamless as possible (aka no changes in the user code). However, the goal is not to implement every single feature or addon that Storybook provides.

Some features that are currently missing but are on our roadmap:

- Generating controls through TS types
