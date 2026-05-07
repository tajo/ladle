---
"@ladle/react": patch
---

fix(app): support CSF v3 stories in `composeEnhancers` (#602)

Storybook's Component Story Format v3 (the default since Storybook 7) describes a story as a plain object — `{ args?, render?, ... }` — rather than a React function component with property attachments (CSF v2). Ladle's `composeEnhancers` previously passed `module[storyName]` directly as `component` to `ArgsProvider`, whose `React.createElement(component, props)` then threw `Element type is invalid: expected a string ... but got: object`.

`composeEnhancers` now resolves the named export to a real component before handing it to `ArgsProvider`:

- If the named export is a function (CSF v2), use it directly.
- If it's an object with a `render` function (CSF v3 render-style), wrap that render function so `createElement` receives a function.
- Else if `meta.component` is present (CSF v3 args-only / empty / decorators-only), render `meta.component` with the merged args.
- Else fall back to a defensive renderer.

CSF v2 stories are unchanged — they continue to follow the existing `typeof storyExport === "function"` path. Args/argTypes spread now reads from `storyExport` symmetrically for both shapes. New `e2e/csf3` Playwright fixture covers args-only, render-only, render+args, and empty CSF v3 shapes.
