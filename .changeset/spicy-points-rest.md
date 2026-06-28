---
"@ladle/react": patch
---

Vite 8 follow-up cleanup: resolve `tsconfig.json` paths via Vite's native `resolve.tsconfigPaths` option (dropping the `vite-tsconfig-paths` dependency) and migrate the MDX plugin from the deprecated `transformWithEsbuild` to `transformWithOxc`.
