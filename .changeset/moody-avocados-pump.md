---
"@ladle/react": major
---

- Ladle now loads top-level `vite.config.js/ts/mjs` and uses all its options.
- All Vite related options from `config.mjs` removed and an error will be thrown, use `vite.config.js` instead.
- `enableFlow` option removed, you can create your own plugin (check our e2e/flow test).
- Programmatic API imports changed to `@ladle/react/serve` and `@ladle/react/build`.
- `--out` renamed to `--outDir` to mimic Vite configuration, added `-o` alias, `outDir` moved to top-level in `config.mjs`.
- `--port` has alias `-p`, `port` moved to top-level in `config.mjs`.
- `vite.config.js` can be customized through `viteConfig` and `--viteConfig`.
- `--base-url` removed, use `base` in `vite.config.js`.
- `--open` removed, use `server.open` in `vite.config.js`.
- `--sourcemap` removed, use `build.sourcemap` in `vite.config.js`.
