# @ladle/react

## 1.1.0

### Minor Changes

- [#162](https://github.com/tajo/ladle/pull/162) [`ff731f5`](https://github.com/tajo/ladle/commit/ff731f5205b0a993f16edae59a159836bd897244) Thanks [@kazuma1989](https://github.com/kazuma1989)! - Load vite.config.ts the same way as Vite

  ## WHAT the breaking change is

  (Only for the package maintainers) a new E2E packages is added.

  ## WHY the change was made

  Ladle was not able to handle `vite.config.ts` the way Vite does.
  For example, Ladle was not able to load `vite.config.ts` which imported other TS modules.

  ## HOW a consumer should update their code

  (Only for the package maintainers) recognize a new e2e workspace with `pnpm install`.

* [#156](https://github.com/tajo/ladle/pull/156) [`0e316d6`](https://github.com/tajo/ladle/commit/0e316d645bc215af384adcc2b785c8f953f57357) Thanks [@tajo](https://github.com/tajo)! - Reuse the same tab for Ladle serve when the env is Google Chrome and OSX.

## 1.0.1

### Patch Changes

- [#154](https://github.com/tajo/ladle/pull/154) [`a53c25a`](https://github.com/tajo/ladle/commit/a53c25abc20d18068bc9a404dfb0bf6c47ca428e) Thanks [@tajo](https://github.com/tajo)! - Set default cacheDir to process.cwd() + node_modules/.vite

## 1.0.0

### Major Changes

- [#153](https://github.com/tajo/ladle/pull/153) [`05bee5d`](https://github.com/tajo/ladle/commit/05bee5d155703fdbd57e4984e21eae6e20a24184) Thanks [@tajo](https://github.com/tajo)! - - Ladle now loads top-level `vite.config.js/ts/mjs` and uses all its options.
  - All Vite related options from `config.mjs` removed and an error will be thrown, use `vite.config.js` instead.
  - `enableFlow` option removed, you can create your own plugin (check our e2e/flow test).
  - Programmatic API imports changed to `@ladle/react/serve` and `@ladle/react/build`.
  - `--out` renamed to `--outDir` to mimic Vite configuration, added `-o` alias, `outDir` moved to top-level in `config.mjs`.
  - `--port` has alias `-p`, `port` moved to top-level in `config.mjs`.
  - `vite.config.js` can be customized through `viteConfig` and `--viteConfig`.
  - `--base-url` removed, use `base` in `vite.config.js`.
  - `--open` removed, use `server.open` in `vite.config.js`.
  - `--sourcemap` removed, use `build.sourcemap` in `vite.config.js`.

### Patch Changes

- [#147](https://github.com/tajo/ladle/pull/147) [`f9a4965`](https://github.com/tajo/ladle/commit/f9a4965e8a7940f9aa41df2c2c8418d37f9f0d35) Thanks [@tajo](https://github.com/tajo)! - Add generic Axe check for (mostly) empty Ladle instance to make sure that projects running axe don't have a problem with Ladle.

## 0.16.0

### Minor Changes

- [#146](https://github.com/tajo/ladle/pull/146) [`8568de6`](https://github.com/tajo/ladle/commit/8568de64640823bb0e66797195288a3b4e81fdb6) Thanks [@tajo](https://github.com/tajo)! - Reload the page if there was a new story added or removed.

### Patch Changes

- [#144](https://github.com/tajo/ladle/pull/144) [`daa717d`](https://github.com/tajo/ladle/commit/daa717dd680cf55da5afbc53809109212555fc3c) Thanks [@tajo](https://github.com/tajo)! - Fixing sourcemaps when using ladle build --sourcemap while using virtual module for our story list and metadata.

## 0.15.2

### Patch Changes

- [#139](https://github.com/tajo/ladle/pull/139) [`421a0c3`](https://github.com/tajo/ladle/commit/421a0c3ef1b97ec2db416c49cadcdd422398ec06) Thanks [@tajo](https://github.com/tajo)! - Force page reload for stories that are defined through .bind({}) syntax (controls). It seems that react-refresh can't detect those when creating boundaries.

## 0.15.1

### Patch Changes

- [#134](https://github.com/tajo/ladle/pull/134) [`2351356`](https://github.com/tajo/ladle/commit/235135613503255bf0e1bf0af5332b7b08d00f2b) Thanks [@tajo](https://github.com/tajo)! - Stories with controls defined through ArgTypes only (and not args at the same time) caused runtime error

* [#133](https://github.com/tajo/ladle/pull/133) [`f0a42ad`](https://github.com/tajo/ladle/commit/f0a42ad7123e30c8ab71d63d843bf0d9670b4931) Thanks [@tajo](https://github.com/tajo)! - Add explicit types for children of GlobalProvider (required for React 18 compatibility)

- [#137](https://github.com/tajo/ladle/pull/137) [`515d069`](https://github.com/tajo/ladle/commit/515d0696665df786e45b5c76aed88239c68cdf24) Thanks [@tajo](https://github.com/tajo)! - Allow typescript typecast default export syntax when parsing stories.

* [#135](https://github.com/tajo/ladle/pull/135) [`c027c8c`](https://github.com/tajo/ladle/commit/c027c8c0a8a2442317b068787c039a580bf2c502) Thanks [@tajo](https://github.com/tajo)! - Surface all errors that happen during the story discovery (parsing) stage. Show them in the UI (a new landing page) and the CLI. Adds information how to deal with them as well.

- [#136](https://github.com/tajo/ladle/pull/136) [`fa8db60`](https://github.com/tajo/ladle/commit/fa8db60ceba04e9d0fab519ad4b3b84e88ba412d) Thanks [@tajo](https://github.com/tajo)! - Undo some basic CSS resets from normalize/preflight that impact Ladle's UI when used.

* [#138](https://github.com/tajo/ladle/pull/138) [`e2069f4`](https://github.com/tajo/ladle/commit/e2069f4b3d2b0b69a034c28e508a171ce011c45a) Thanks [@tajo](https://github.com/tajo)! - Add a section explaining the limitations of story syntax - some parts need to be static so they can be parsed.

- [#126](https://github.com/tajo/ladle/pull/126) [`0a44aa2`](https://github.com/tajo/ladle/commit/0a44aa2a1b40f392db3163cddfdae7633771edec) Thanks [@beckend](https://github.com/beckend)! - feat: allow configuration of the whole Vite config.resolve object

## 0.15.0

### Minor Changes

- d40aa73: Changing the tooling to turborepo

### Patch Changes

- 2c7263c: Remove conventional commits
