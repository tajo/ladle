---
"@ladle/react": patch
---

fix: add proper types for dialog components

Adds explicit prop types for `DialogOverlay` and `DialogContent` and removes
the `@ts-ignore` directives in the `Modal` component (the
[#626](https://github.com/tajo/ladle/pull/626) change). This unblocks
downstream consumers running stricter typecheckers — notably
[`@typescript/native-preview` (tsgo)](https://www.npmjs.com/package/@typescript/native-preview),
which surfaces the underlying `Property 'isOpen' does not exist on type
'IntrinsicAttributes & RefAttributes<unknown>'` error from
`typings-for-build/app/src/ui.tsx` even with `skipLibCheck: true`.
