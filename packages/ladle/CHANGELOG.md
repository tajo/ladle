# @ladle/react

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
