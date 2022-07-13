# @ladle/react

## 1.3.0

### Minor Changes

- [#190](https://github.com/tajo/ladle/pull/190) [`21959e9`](https://github.com/tajo/ladle/commit/21959e96878c65681a090b32d82028bd9470e030) Thanks [@tajo](https://github.com/tajo)! - Add addon-width and iframe mode. You can set `meta.width` and `meta.iframed` to render stories inside of an iframe. This is useful for testing responsivness or components like modal that take full screen.

* [`1745a95`](https://github.com/tajo/ladle/commit/1745a95eb664404db51168a4adaeec2f87841044) Thanks [@tajo](https://github.com/tajo)! - Add support for native Windows.

### Patch Changes

- [#188](https://github.com/tajo/ladle/pull/188) [`2f142cc`](https://github.com/tajo/ladle/commit/2f142cc2d8354b120236d29d4cc78132a6510a55) Thanks [@pdeslaur](https://github.com/pdeslaur)! - Fix compatibility issue with resolve.alias vite config to fix issue tajo/ladle#187.

* [#187](https://github.com/tajo/ladle/pull/187) [`ebb1923`](https://github.com/tajo/ladle/commit/ebb192340a331756ce49424ee823435814bf5611) Thanks [@tajo](https://github.com/tajo)! - Move background color to negative zindex to support cases when components use some negative zindexes as well.

- [#189](https://github.com/tajo/ladle/pull/189) [`f84bbde`](https://github.com/tajo/ladle/commit/f84bbdeada095746698434b18b79d7d751dd631c) Thanks [@tajo](https://github.com/tajo)! - Improve the performance of virtual stories modules. fs.promises.readFile much slower than fs.promises.readSync and it blocking CPU doesn't matter in our use case anyway. Also don't run the story watcher on the startup.

* [#187](https://github.com/tajo/ladle/pull/187) [`ebb1923`](https://github.com/tajo/ladle/commit/ebb192340a331756ce49424ee823435814bf5611) Thanks [@tajo](https://github.com/tajo)! - Fix story source escaping.

- [#190](https://github.com/tajo/ladle/pull/190) [`21959e9`](https://github.com/tajo/ladle/commit/21959e96878c65681a090b32d82028bd9470e030) Thanks [@tajo](https://github.com/tajo)! - Fix: Export default title and meta params. They were not correctly applied before. This might change the story IDs (URLs and the sidebar labels) if you were using them before.

## 1.2.0

### Minor Changes

- [#174](https://github.com/tajo/ladle/pull/174) [`5abef5f`](https://github.com/tajo/ladle/commit/5abef5fec446ba8efd82b4e9f0ed3e24bc904458) Thanks [@tajo](https://github.com/tajo)! - - Add ladle preview command to quickly open a serve for the build folder.
  - Fix host and https options for serve and preview commands.
  - Measure time and size of the build. Display it.

### Patch Changes

- [#173](https://github.com/tajo/ladle/pull/173) [`ddaebfd`](https://github.com/tajo/ladle/commit/ddaebfd6e0042285d3f225bc4a8a25ba0f8d3bbf) Thanks [@GeorgeNagel](https://github.com/GeorgeNagel)! - Add engine settings and node restriction for @ladle/react so that install fails for users when node < 16.x

* [#170](https://github.com/tajo/ladle/pull/170) [`04714c9`](https://github.com/tajo/ladle/commit/04714c9f5343cef539cac2c44b58e3b7d5255479) Thanks [@GeorgeNagel](https://github.com/GeorgeNagel)! - Enforce that Node version >= v16.0.0. This causes a loud failure when installing ladle with an old version of Node, as opposed to silently failing and causing difficult-to-diagnose bugs.

- [#172](https://github.com/tajo/ladle/pull/172) [`5049ce9`](https://github.com/tajo/ladle/commit/5049ce9c79ffdd5afdb87ff953c0aa9b9d834a16) Thanks [@tajo](https://github.com/tajo)! - Fix Chrome (tab) re-opening for pnp environments..

## 1.1.2

### Patch Changes

- [#166](https://github.com/tajo/ladle/pull/166) [`14a1619`](https://github.com/tajo/ladle/commit/14a1619b89ea43b94816ab088897a7311cf587f9) Thanks [@tajo](https://github.com/tajo)! - Move React Context into a separate package so there is a single instance in the dev mode and useLadleContext hook works. Also, adding some documentation for the hook.

* [#166](https://github.com/tajo/ladle/pull/166) [`14a1619`](https://github.com/tajo/ladle/commit/14a1619b89ea43b94816ab088897a7311cf587f9) Thanks [@tajo](https://github.com/tajo)! - Align server.open more with the official Vite's API.

* Updated dependencies [[`14a1619`](https://github.com/tajo/ladle/commit/14a1619b89ea43b94816ab088897a7311cf587f9)]:
  - @ladle/react-context@1.0.1

## 1.1.1

### Patch Changes

- [#163](https://github.com/tajo/ladle/pull/163) [`06d8a62`](https://github.com/tajo/ladle/commit/06d8a6273ae8583000249e0cf122803a4f25344e) Thanks [@tajo](https://github.com/tajo)! - Set ellipsis to top level sidebar items.

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
