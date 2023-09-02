# @ladle/react

## 2.17.2

### Patch Changes

- [#472](https://github.com/tajo/ladle/pull/472) [`d51e5f4`](https://github.com/tajo/ladle/commit/d51e5f48697786a73376744da8a0a63c56f36f1f) Thanks [@tajo](https://github.com/tajo)! - Global hotkeys should work from inside of the iframe as well.

## 2.17.1

### Patch Changes

- [#470](https://github.com/tajo/ladle/pull/470) [`9eb9731`](https://github.com/tajo/ladle/commit/9eb97313d859d8d93c6780f1fa43efdfdcbf34f7) Thanks [@tajo](https://github.com/tajo)! - Increase chunk size warning

## 2.17.0

### Minor Changes

- [#468](https://github.com/tajo/ladle/pull/468) [`92ea9b1`](https://github.com/tajo/ladle/commit/92ea9b12306d7042fed663c9d8856989ecce0eda) Thanks [@tajo](https://github.com/tajo)! - Ladle is adding a few hotkeys to make your life easier:

  - `/` or `⌘ cmd ＋ p` - Focus search input in the sidebar
  - `⌥ opt ＋ →` - Go to the next story
  - `⌥ opt ＋ ←` - Go to the previous story
  - `⌥ opt ＋ ↓` - Go to the next component
  - `⌥ opt ＋ ↑` - Go to the previous component
  - `c` - Toggle controls addon
  - `d` - Toggle dark mode
  - `f` - Toggle fullscreen mode
  - `w` - Toggle width addon
  - `r` - Toggle right-to-left mode
  - `s` - Toggle story source addon
  - `a` - Toggle accessibility addon

  These defaults can be customized through the configuration. Some stories might have utilize their own set of hotkeys. If you want to prevent conflicts with Ladle, you can disable all Ladle shortcuts for a specific story by using the `meta` parameter:

  ```tsx
  export default {
    meta: {
      hotkeys: false,
    },
  };
  Story.meta = {
    hotkeys: false,
  };
  ```

## 2.16.1

### Patch Changes

- [#462](https://github.com/tajo/ladle/pull/462) [`3739ddb`](https://github.com/tajo/ladle/commit/3739ddb7596ba377ec1684917d4cc3525bea733b) Thanks [@tajo](https://github.com/tajo)! - Pin react-frame-component to 5.2.4 (again)

## 2.16.0

### Minor Changes

- [#460](https://github.com/tajo/ladle/pull/460) [`29c4e6c`](https://github.com/tajo/ladle/commit/29c4e6cf09671a93b9f013854e887760cde316df) Thanks [@tajo](https://github.com/tajo)! - Support argTypes boolean, text, number, color and date.

### Patch Changes

- [#458](https://github.com/tajo/ladle/pull/458) [`8ee198f`](https://github.com/tajo/ladle/commit/8ee198f1e7610b86f88b7fda93e2d026caf56e88) Thanks [@tajo](https://github.com/tajo)! - Bump all dependencies

## 2.15.0

### Minor Changes

- [#449](https://github.com/tajo/ladle/pull/449) [`d3e0200`](https://github.com/tajo/ladle/commit/d3e0200a10af2b9d5ad44b2962fdc3efbe0afe6c) Thanks [@tajo](https://github.com/tajo)! - Add args and argTypes to context for Storybook compat

- [#447](https://github.com/tajo/ladle/pull/447) [`802b351`](https://github.com/tajo/ladle/commit/802b3518e5e5536ad8d426a9aed228185f055b6e) Thanks [@tajo](https://github.com/tajo)! - Pass legacy parameters through context into decorators (Storybook compat)

- [#450](https://github.com/tajo/ladle/pull/450) [`7ce734a`](https://github.com/tajo/ladle/commit/7ce734a5392d994748a0e552c7ea1b292b29d8e2) Thanks [@tajo](https://github.com/tajo)! - Quicker side-navigation for deeply nested stories. The sub-tree is automatically expanded and the first story/link activated.

## 2.14.0

### Minor Changes

- [#444](https://github.com/tajo/ladle/pull/444) [`1272570`](https://github.com/tajo/ladle/commit/1272570f8eeb5758175b7abdf501ea538853170d) Thanks [@dtgreene](https://github.com/dtgreene)! - Use Vite v4.3.9

## 2.13.0

### Minor Changes

- [#437](https://github.com/tajo/ladle/pull/437) [`04a4662`](https://github.com/tajo/ladle/commit/04a4662b41b9d82b8b5d134f07f8b4c9757ef901) Thanks [@tajo](https://github.com/tajo)! - Include all stories into optimizeDeps.entries so all deps get prebundled and there are no further reloads later.

### Patch Changes

- [#438](https://github.com/tajo/ladle/pull/438) [`6d720ab`](https://github.com/tajo/ladle/commit/6d720ab7170f046f905d51c3b277c1bc6d53d5e3) Thanks [@tajo](https://github.com/tajo)! - Add support for args mapping

## 2.12.3

### Patch Changes

- [#427](https://github.com/tajo/ladle/pull/427) [`180cfd5`](https://github.com/tajo/ladle/commit/180cfd50518e8c1a4b5b74b43ae65234484b8498) Thanks [@tajo](https://github.com/tajo)! - Add i18n and onDevServerStart config options (undocumented for now)

## 2.12.2

### Patch Changes

- [#424](https://github.com/tajo/ladle/pull/424) [`ebe1594`](https://github.com/tajo/ladle/commit/ebe15941c63b6548a29784230f2c2ea2c106ad09) Thanks [@tajo](https://github.com/tajo)! - Fix iframe styles

## 2.12.1

### Patch Changes

- [#420](https://github.com/tajo/ladle/pull/420) [`10456ac`](https://github.com/tajo/ladle/commit/10456ac20ffcff4bcecc7102c589d1df1c635765) Thanks [@tajo](https://github.com/tajo)! - When the width of iframed story was bigger than the main canvas, the iframe was not properly centered and parts were missing.

## 2.12.0

### Minor Changes

- [#413](https://github.com/tajo/ladle/pull/413) [`b75f5c4`](https://github.com/tajo/ladle/commit/b75f5c42f282a4069c9f72bb09e21c890ebe17ca) Thanks [@wojtekmaj](https://github.com/wojtekmaj)! - Improved wording on "Story not found" page, added "Back to home" link, fixed typo in GitHub name

### Patch Changes

- [#418](https://github.com/tajo/ladle/pull/418) [`27d90ed`](https://github.com/tajo/ladle/commit/27d90edd6f38d7cf8ebfc8a4ba3792935b019d39) Thanks [@tajo](https://github.com/tajo)! - Fix context.globalState passed into decorators (second argument) was not updated.

## 2.11.1

### Patch Changes

- [#414](https://github.com/tajo/ladle/pull/414) [`06bf239`](https://github.com/tajo/ladle/commit/06bf239767a12488e6f50e450d0286d19e740e01) Thanks [@tajo](https://github.com/tajo)! - Recent react-frame-component version bump causes iframe content to glitch - it sometimes doesn't load. It seems they switched some waiting logic. Pinning this dependency to 5.2.4 - the latest working version for now.

## 2.11.0

### Minor Changes

- [#412](https://github.com/tajo/ladle/pull/412) [`6567b78`](https://github.com/tajo/ladle/commit/6567b7898e2a9ab47607e9dacf96443102838d91) Thanks [@tajo](https://github.com/tajo)! - ## Global `args` and `argTypes`

  You can now define global args and argTypes in `.ladle/components.tsx`:

  ```tsx
  export const args = {
    test: true,
  };

  export const argTypes = {
    cities: {
      control: { type: "select" },
      options: ["NYC", "London", "Tokyo"],
    },
  };
  ```

  These will be applied to all stories in your project and can be overriden on the story level.

  ## Background Control

  Introducing a new special control type `background`. You can use it to change the background color of your stories. You might want to place it into `.ladle/components.tsx` so it's available to all stories. There can be only one active background control.

  ```tsx
  export const argTypes = {
    background: {
      control: { type: "background" },
      options: ["purple", "blue", "white", "pink"],
      defaultValue: "purple",
    },
  };
  ```

  ## Control Name and Labels

  You can now customize the name and labels of your controls and their options:

  ```tsx
  Story.argTypes = {
    airports: {
      name: "International Airports",
      control: {
        type: "select",
        labels: {
          sfo: "San Francisco",
          lax: "Los Angeles",
          prg: "Prague",
        },
      },
      options: ["sfo", "lax", "prg"],
    },
  };
  ```

  ## Deterministic `meta.json`

  Stories are now sorted in the `meta.json` file in a deterministic way. Useful when creating a hash of the Ladle's output for caching purposes.

### Patch Changes

- [#409](https://github.com/tajo/ladle/pull/409) [`0182092`](https://github.com/tajo/ladle/commit/01820927171422ac300123c1ca2bb0d71c2743ce) Thanks [@tajo](https://github.com/tajo)! - Don't active tsconfig path plugin in yarn pnp env since it's buggy

## 2.10.2

### Patch Changes

- [#402](https://github.com/tajo/ladle/pull/402) [`4737a54`](https://github.com/tajo/ladle/commit/4737a540302b96dc37976320ee1da1bc9177dbb7) Thanks [@wojtekmaj](https://github.com/wojtekmaj)! - Add type="button" to all buttons to reduce noise in Microsoft Edge DevTools Issues panel

- [#403](https://github.com/tajo/ladle/pull/403) [`c4e60d6`](https://github.com/tajo/ladle/commit/c4e60d67238b2d360b4d4d27d78c71504bef87b0) Thanks [@wojtekmaj](https://github.com/wojtekmaj)! - Rename manifest.json to manifest.webmanifest to reduce noise in Microsoft Edge DevTools Issues panel

## 2.10.1

### Patch Changes

- [#391](https://github.com/tajo/ladle/pull/391) [`9433781`](https://github.com/tajo/ladle/commit/94337812bfbd11d003892eeb96dee8208739f19c) Thanks [@wojtekmaj](https://github.com/wojtekmaj)! - Fixed TypeScript error when using StoryDecorator type

## 2.10.0

### Minor Changes

- [#388](https://github.com/tajo/ladle/pull/388) [`c4a7c96`](https://github.com/tajo/ladle/commit/c4a7c96713f3c32803f37d58866a8dc6b39d352d) Thanks [@tajo](https://github.com/tajo)! - Add StoryDefault type and support for satisfies. Update all the stories & docs with proper static types.

### Patch Changes

- [#389](https://github.com/tajo/ladle/pull/389) [`cf0fc58`](https://github.com/tajo/ladle/commit/cf0fc5861fe6baffd6fe0f98d18bc0cda7098a68) Thanks [@azuline](https://github.com/azuline)! - Add a CLI --host option for serve and preview commands that overrides vite.config.js settings.

## 2.9.0

### Minor Changes

- [#382](https://github.com/tajo/ladle/pull/382) [`36f65d8`](https://github.com/tajo/ladle/commit/36f65d8a58e530231300ba38b0c6d589c102aac1) Thanks [@tajo](https://github.com/tajo)! - Add locStart and locEnd to SourceHeader

### Patch Changes

- [#380](https://github.com/tajo/ladle/pull/380) [`2404878`](https://github.com/tajo/ladle/commit/2404878d4f279e43ca2d559ba38e0d384e2a878f) Thanks [@tajo](https://github.com/tajo)! - Use create-react-app openBrowser script. Remove the default-browser logic.

## 2.8.0

### Minor Changes

- [#377](https://github.com/tajo/ladle/pull/377) [`c6fb86b`](https://github.com/tajo/ladle/commit/c6fb86b629a45fbf140eb7938ba3504693244c7d) Thanks [@tajo](https://github.com/tajo)! - Add StorySourceHeader export into components.tsx to be able customizing the addon's header.

- [#379](https://github.com/tajo/ladle/pull/379) [`6bce3dd`](https://github.com/tajo/ladle/commit/6bce3dd52e63bb16c8d84189dd01e2b95bbc6928) Thanks [@tajo](https://github.com/tajo)! - Add support for HTTP/2 for better dev performance.

### Patch Changes

- [#375](https://github.com/tajo/ladle/pull/375) [`4f68427`](https://github.com/tajo/ladle/commit/4f68427b82cdce607b11dd189221097788f539a6) Thanks [@tajo](https://github.com/tajo)! - Fix unmounting story when source code addon is open

- [#378](https://github.com/tajo/ladle/pull/378) [`6da7689`](https://github.com/tajo/ladle/commit/6da7689407d3e26839a57ef9ebd3a938a4fa8f53) Thanks [@tajo](https://github.com/tajo)! - Allow to pass undefined into action()

## 2.7.4

### Patch Changes

- [#372](https://github.com/tajo/ladle/pull/372) [`4fb1cf2`](https://github.com/tajo/ladle/commit/4fb1cf2b089f46213c52bef8c1e794294af9fa4e) Thanks [@tajo](https://github.com/tajo)! - Add zindex to addons panel so it's always at the top.

## 2.7.3

### Patch Changes

- [#370](https://github.com/tajo/ladle/pull/370) [`9b8667d`](https://github.com/tajo/ladle/commit/9b8667d349813a769f8d59eca4d41d59ac7ab6e3) Thanks [@jharwig](https://github.com/jharwig)! - Fix range arguments loaded from search params being strings instead of numbers

## 2.7.2

### Patch Changes

- [#368](https://github.com/tajo/ladle/pull/368) [`34b006e`](https://github.com/tajo/ladle/commit/34b006ecc78501adff263d635d298b47df926c9b) Thanks [@tajo](https://github.com/tajo)! - Pass programatic params into client's config. Add storyOrder e2e tests.

## 2.7.1

### Patch Changes

- [#367](https://github.com/tajo/ladle/pull/367) [`c48817a`](https://github.com/tajo/ladle/commit/c48817a03756dca1ef38f50904fa48b1d867712f) Thanks [@tajo](https://github.com/tajo)! - Fix useLandleContext()

- [#364](https://github.com/tajo/ladle/pull/364) [`0c462a6`](https://github.com/tajo/ladle/commit/0c462a6011ce7a9677542a17ffec8cfb09713ff3) Thanks [@justb3a](https://github.com/justb3a)! - Add `--base` cli option in preview mode

## 2.7.0

### Minor Changes

- [#361](https://github.com/tajo/ladle/pull/361) [`54832e4`](https://github.com/tajo/ladle/commit/54832e4d07e9e06dcfa4a63710a270944b7a7a00) Thanks [@tajo](https://github.com/tajo)! - Add support for the SWC plugin.

## 2.6.4

### Patch Changes

- [#358](https://github.com/tajo/ladle/pull/358) [`6a5c5a2`](https://github.com/tajo/ladle/commit/6a5c5a2650de4e610a0808778f63eb163536f251) Thanks [@tajo](https://github.com/tajo)! - Fix absolute import path on windows.

## 2.6.3

### Patch Changes

- [#355](https://github.com/tajo/ladle/pull/355) [`3277dce`](https://github.com/tajo/ladle/commit/3277dceb31b3f0d89a4cd2114a530ba78432f130) Thanks [@tajo](https://github.com/tajo)! - Change the way how values from config.mjs are passed to the client. We were doing direct import into the app but that breaks cases when config.mjs uses Node APIs. Also, it risks leaking potentially sensitive stuff from the CLI side. And it's cubersome when used through programatic API / wrapper libraries. The new solution picks just a subset of config.mjs values that are really needed in the client, serializes them and embeds them into our virtual module.

## 2.6.2

### Patch Changes

- [#352](https://github.com/tajo/ladle/pull/352) [`efb6193`](https://github.com/tajo/ladle/commit/efb619325fcac2b1972765b95b7d877968aa90bc) Thanks [@tajo](https://github.com/tajo)! - Use esbuild to compile JSX after MDX. Remove unused babel deps.

## 2.6.1

### Patch Changes

- [#350](https://github.com/tajo/ladle/pull/350) [`dc57fa2`](https://github.com/tajo/ladle/commit/dc57fa2a33edbb39db341f0f99592638eab00c06) Thanks [@tajo](https://github.com/tajo)! - Fix leaky <code> CSS

## 2.6.0

### Minor Changes

- [#342](https://github.com/tajo/ladle/pull/342) [`c75cdf9`](https://github.com/tajo/ladle/commit/c75cdf92cebf5ec3be331f3710dab3caa19faae6) Thanks [@smajl](https://github.com/smajl)! - range type control added

- [#347](https://github.com/tajo/ladle/pull/347) [`2b7df77`](https://github.com/tajo/ladle/commit/2b7df7792f1e2ba6395bd0602145ed3f61ebf7f6) Thanks [@tajo](https://github.com/tajo)! - Add storySort setting to customize the order of stories in the navigation.

### Patch Changes

- [#343](https://github.com/tajo/ladle/pull/343) [`28a307b`](https://github.com/tajo/ladle/commit/28a307b202270aba8124aa56b4580c8f16325344) Thanks [@tajo](https://github.com/tajo)! - Shadow release of basic MDX support

- [#345](https://github.com/tajo/ladle/pull/345) [`1ba8ed5`](https://github.com/tajo/ladle/commit/1ba8ed5e10776bee225ae1612cf432238e5e0edf) Thanks [@wojtekmaj](https://github.com/wojtekmaj)! - Improved type safety in `args`, `argTypes` and `meta` in Stories

## 2.5.4

### Patch Changes

- [#340](https://github.com/tajo/ladle/pull/340) [`047dcab`](https://github.com/tajo/ladle/commit/047dcab6b1de8cec75aaa0f3da010ad7972ee317) Thanks [@tajo](https://github.com/tajo)! - Reset control state when navigating between stories.

## 2.5.3

### Patch Changes

- [#330](https://github.com/tajo/ladle/pull/330) [`2f85341`](https://github.com/tajo/ladle/commit/2f85341836d038e978cd97f5661f4a92dbc76cdd) Thanks [@tajo](https://github.com/tajo)! - Fix default files/folders that are allowed to be served by Ladle. It didn't work correctly when the Vite's base setting was used.

- [#331](https://github.com/tajo/ladle/pull/331) [`2ba29c8`](https://github.com/tajo/ladle/commit/2ba29c8a7635a2509837f93d7bea88f310510094) Thanks [@tajo](https://github.com/tajo)! - Change internal implementation of controls to keep it simpler. Remove typings from the URL args.

- [`2ea1605`](https://github.com/tajo/ladle/commit/2ea1605fe492fc2eed696f756c79f2747e4bf69e) Thanks [@tajo](https://github.com/tajo)! - Greenkeeping

- [#332](https://github.com/tajo/ladle/pull/332) [`b3de582`](https://github.com/tajo/ladle/commit/b3de582561c0beab0ffba5c6c51b738ac4420fba) Thanks [@tajo](https://github.com/tajo)! - Fix RTL in inframed mode. Simplify URL state persistance.

- [#327](https://github.com/tajo/ladle/pull/327) [`fb6634f`](https://github.com/tajo/ladle/commit/fb6634f10f99b1eb1a80cab46a90b7b61d324361) Thanks [@tajo](https://github.com/tajo)! - Prevent story remounts when Ladle state changes (control changed, action fired...)

- [#333](https://github.com/tajo/ladle/pull/333) [`1cf19bd`](https://github.com/tajo/ladle/commit/1cf19bd564bc561f46ae0a72b3d9078e4b6a4b48) Thanks [@tajo](https://github.com/tajo)! - Remove types from the virtual-module

## 2.5.2

### Patch Changes

- [#324](https://github.com/tajo/ladle/pull/324) [`116f219`](https://github.com/tajo/ladle/commit/116f2199637a7945f212e2378ea5bc2c58a0c7fc) Thanks [@tajo](https://github.com/tajo)! - Preventing Vite to serve files outside of root workspace. The dev server also doens't autobind to all network interfaces (aligned with the Vite's default).

## 2.5.1

### Patch Changes

- [#321](https://github.com/tajo/ladle/pull/321) [`320b13d`](https://github.com/tajo/ladle/commit/320b13d8b74836ed95e80fbc4f16856ba4ff17b4) Thanks [@tajo](https://github.com/tajo)! - Use undefined as default for controls

## 2.5.0

### Minor Changes

- [#317](https://github.com/tajo/ladle/pull/317) [`9339a40`](https://github.com/tajo/ladle/commit/9339a40ff7f5a6b78a9b878e886b86756f87f3c4) Thanks [@tajo](https://github.com/tajo)! - Add support for file-level args and argTypes

- [#298](https://github.com/tajo/ladle/pull/298) [`2616fa5`](https://github.com/tajo/ladle/commit/2616fa5a6a8204a72223136db90188598a9b83af) Thanks [@tajo](https://github.com/tajo)! - Ugrade to Vite4 and all other deps

- [#316](https://github.com/tajo/ladle/pull/316) [`eb37c47`](https://github.com/tajo/ladle/commit/eb37c47ad9ed0f58d70c4cc3686fc01ccf7a3d62) Thanks [@tajo](https://github.com/tajo)! - Add new control types - check, inline-check, multi-select, inline-radio

- [`91c758c`](https://github.com/tajo/ladle/commit/91c758ccf2fc27fae3b84754a2b23b5439913751) Thanks [@tajo](https://github.com/tajo)! - Provider has access to story.meta values through a new argument storyMeta.

### Patch Changes

- [#305](https://github.com/tajo/ladle/pull/305) [`e355c4b`](https://github.com/tajo/ladle/commit/e355c4be10d1a6acb382d407c18b402c48df4479) Thanks [@apttap](https://github.com/apttap)! - Patched bug relating to console errors and unexpected behavior when using undefined values in controls addon / argTypes

- [#315](https://github.com/tajo/ladle/pull/315) [`ca48380`](https://github.com/tajo/ladle/commit/ca48380b390192967020a64f4b12324f32294922) Thanks [@tajo](https://github.com/tajo)! - Coerce boolean and undefined values into strings when used in radio and select controls. This also makes it easy to pass those values through the URL.

- [#300](https://github.com/tajo/ladle/pull/300) [`bee0789`](https://github.com/tajo/ladle/commit/bee07894ab1db15e62792e9f8caebb96cd0288d1) Thanks [@tajo](https://github.com/tajo)! - publicDir should default to the folder public if there is no vite.config.js

## 2.4.5

### Patch Changes

- [#283](https://github.com/tajo/ladle/pull/283) [`6a4db14`](https://github.com/tajo/ladle/commit/6a4db1437a67d5d1632dc08e21ba5e2e21a90081) Thanks [@frehner](https://github.com/frehner)! - Include the typings folder when publishing

- [#281](https://github.com/tajo/ladle/pull/281) [`30e9299`](https://github.com/tajo/ladle/commit/30e92998ce9977ed510507030047511fb613d436) Thanks [@frehner](https://github.com/frehner)! - Fix issue in GitHub Actions when publishing both next and current release.

## 2.4.4

### Patch Changes

- [#277](https://github.com/tajo/ladle/pull/277) [`6245aa7`](https://github.com/tajo/ladle/commit/6245aa7cad918a7576dc452669d6f07fde935a91) Thanks [@frehner](https://github.com/frehner)! - Fix types for CJS projects using TypeScript's "NodeNext" or "Node16" resolution.

- [#275](https://github.com/tajo/ladle/pull/275) [`4ef2e1d`](https://github.com/tajo/ladle/commit/4ef2e1d23ab27b77f65922388e248da686061f9c) Thanks [@frehner](https://github.com/frehner)! - Update `package.json`'s "types" and "exports" so that they point to the type definition file, but only when publishing to NPM.

## 2.4.3

### Patch Changes

- [#257](https://github.com/tajo/ladle/pull/257) [`7d2af89`](https://github.com/tajo/ladle/commit/7d2af89540ce00cd054fb8e085358398adb365ba) Thanks [@tajo](https://github.com/tajo)! - Replace Jest with Vitest

- [#263](https://github.com/tajo/ladle/pull/263) [`7880686`](https://github.com/tajo/ladle/commit/78806861070e894f539cad3fa6fa913275472291) Thanks [@tajo](https://github.com/tajo)! - Use absolute paths for imports to simplify and fix resolver issues in workspaces

## 2.4.2

### Patch Changes

- [#254](https://github.com/tajo/ladle/pull/254) [`4ea7124`](https://github.com/tajo/ladle/commit/4ea71241545d869e3b7527cea2976bcf5f5fba80) Thanks [@tajo](https://github.com/tajo)! - Remove React hooks from action() and linkTo()

## 2.4.1

### Patch Changes

- [#251](https://github.com/tajo/ladle/pull/251) [`223d904`](https://github.com/tajo/ladle/commit/223d9040067bc9fcfb42dd7faef150d37ce62a49) Thanks [@tajo](https://github.com/tajo)! - Don't navigate to an already active story.

* [#248](https://github.com/tajo/ladle/pull/248) [`0b52fe0`](https://github.com/tajo/ladle/commit/0b52fe05c3e8599b51e2d1038be42c84b08a22cc) Thanks [@tajo](https://github.com/tajo)! - Fix HMR and add e2e tests.

## 2.4.0

### Minor Changes

- [#243](https://github.com/tajo/ladle/pull/243) [`f2d2cd3`](https://github.com/tajo/ladle/commit/f2d2cd3f5fd8991e7c65748c3854a9e6bdd48dab) Thanks [@tajo](https://github.com/tajo)! - Inject HTML into <head> through .ladle/head.html or appendToHead config option.

### Patch Changes

- [#241](https://github.com/tajo/ladle/pull/241) [`946f060`](https://github.com/tajo/ladle/commit/946f060f66ace419718e72974d30212bd102ae2d) Thanks [@tajo](https://github.com/tajo)! - Use the system settings for default browser if nothing is specified by user.

## 2.3.0

### Minor Changes

- [#238](https://github.com/tajo/ladle/pull/238) [`41d6e97`](https://github.com/tajo/ladle/commit/41d6e977125ba9c7d1d6d63f4b625573c1a88449) Thanks [@tajo](https://github.com/tajo)! - Add red badges to addon buttons to signify when their state is changed.

* [#240](https://github.com/tajo/ladle/pull/240) [`5ca04b6`](https://github.com/tajo/ladle/commit/5ca04b65f9a4ad00e663a42b5fc3a1146d7a49cd) Thanks [@tajo](https://github.com/tajo)! - Add the addon Action. Can be used through argTypes or dynamically as a direct import from Ladle.

- [#240](https://github.com/tajo/ladle/pull/240) [`5ca04b6`](https://github.com/tajo/ladle/commit/5ca04b65f9a4ad00e663a42b5fc3a1146d7a49cd) Thanks [@tajo](https://github.com/tajo)! - Add linkTo as a simpler alternative to the useLink hook. It seems you can't really break the rule of hooks while using it directly.

* [#234](https://github.com/tajo/ladle/pull/234) [`15e179e`](https://github.com/tajo/ladle/commit/15e179e51d237bbeb153a306c0fcd64f32ec9590) Thanks [@jcleefw](https://github.com/jcleefw)! - Fix config file to support entry files of array of strings

  The `.ladle/config.mjs` files now supports array of strings for stories

  ```tsx
  // array of strings
  export default {
    stories: [
      "src/**/control.stories.{js,jsx,ts,tsx}",
      "src/stories.custom.tsx",
    ],
  };
  ```

## 2.2.2

### Patch Changes

- [#235](https://github.com/tajo/ladle/pull/235) [`7aee108`](https://github.com/tajo/ladle/commit/7aee1081276e994b0be611fec662d7fa7fa29740) Thanks [@tajo](https://github.com/tajo)! - Fix an edge case where args/decorators could cause a React hook rules error.

## 2.2.1

### Patch Changes

- [`8d50c58`](https://github.com/tajo/ladle/commit/8d50c58475ea1536e5c2077e9ad58f522cb65da4) Thanks [@tajo](https://github.com/tajo)! - Fix leaking CSS styles for input and textarea

## 2.2.0

### Minor Changes

- [#230](https://github.com/tajo/ladle/pull/230) [`2ecf274`](https://github.com/tajo/ladle/commit/2ecf2741249bd29b2fea08960b2add0f0d026c00) Thanks [@tajo](https://github.com/tajo)! - Add Ladle context as the second parameter for decorators. This change also fixes a bug when the usage of arg/argTypes disabled the decorators for the related story. More documentation added. New StoryDecorator type exported.

### Patch Changes

- [#230](https://github.com/tajo/ladle/pull/230) [`2ecf274`](https://github.com/tajo/ladle/commit/2ecf2741249bd29b2fea08960b2add0f0d026c00) Thanks [@tajo](https://github.com/tajo)! - Add default styles to addon inputs and buttons.

## 2.1.2

### Patch Changes

- [#228](https://github.com/tajo/ladle/pull/228) [`2891aba`](https://github.com/tajo/ladle/commit/2891aba3a5bf59be190e1278d19469c8d626d103) Thanks [@Shinyaigeek](https://github.com/Shinyaigeek)! - fix prevent dev-server from redirecting loop in top page

## 2.1.1

### Patch Changes

- [#222](https://github.com/tajo/ladle/pull/222) [`5b3d113`](https://github.com/tajo/ladle/commit/5b3d1135f5fc5935aba346a38398b948063abfb9) Thanks [@moltar](https://github.com/moltar)! - fix: import performance explicitly to fix node 14

* [#225](https://github.com/tajo/ladle/pull/225) [`34bf386`](https://github.com/tajo/ladle/commit/34bf38692683caf2469c7d5524a0c97771dc716e) Thanks [@tajo](https://github.com/tajo)! - Update all dependencies, remove React.FC in most places.

## 2.1.0

### Minor Changes

- [#202](https://github.com/tajo/ladle/pull/202) [`7fcdc97`](https://github.com/tajo/ladle/commit/7fcdc9752b053629b609beee96ea646e12abe630) Thanks [@akx](https://github.com/akx)! - Add `--base` and `--mode` options à la `vite build`

### Patch Changes

- [#214](https://github.com/tajo/ladle/pull/214) [`8ff5d29`](https://github.com/tajo/ladle/commit/8ff5d29b367d53ea97d00227c1a77c6cb9ca8db7) Thanks [@tajo](https://github.com/tajo)! - Enforce importsNotUsedAsValues tsc option, fix bad imports.

* [#216](https://github.com/tajo/ladle/pull/216) [`e9c2318`](https://github.com/tajo/ladle/commit/e9c23188add4d7533c32ac0f98cbd037dcf4e996) Thanks [@tajo](https://github.com/tajo)! - Error out when story named export has \_\_. We use it to encode sublevels internally and this would break the sidebar navigation.

- [#215](https://github.com/tajo/ladle/pull/215) [`46a6b97`](https://github.com/tajo/ladle/commit/46a6b97a67ea46a79edbadf0a7b5f6c8bce0f6f4) Thanks [@tajo](https://github.com/tajo)! - Fix browser open script when for pnp environments.

* [#217](https://github.com/tajo/ladle/pull/217) [`bc6ad85`](https://github.com/tajo/ladle/commit/bc6ad85efef15676cb1bcc2e86dc48b2dcea02e1) Thanks [@tajo](https://github.com/tajo)! - Bump all dependencies to the latest versions.

## 2.0.2

### Patch Changes

- [#198](https://github.com/tajo/ladle/pull/198) [`3c8b35c`](https://github.com/tajo/ladle/commit/3c8b35c0add52224aa6480be4065b5c496a9dc8c) Thanks [@tajo](https://github.com/tajo)! - Fix missing --stories flag for ladle build.

* [#198](https://github.com/tajo/ladle/pull/198) [`3c8b35c`](https://github.com/tajo/ladle/commit/3c8b35c0add52224aa6480be4065b5c496a9dc8c) Thanks [@tajo](https://github.com/tajo)! - Don't replace user provided css.postcss in config

## 2.0.1

### Patch Changes

- [#196](https://github.com/tajo/ladle/pull/196) [`f92ed78`](https://github.com/tajo/ladle/commit/f92ed78c2a981277a501fabbfbd10a8c0c8d2460) Thanks [@tajo](https://github.com/tajo)! - Fix some CSS sync issue when switching into iframed version.

## 2.0.0

### Major Changes

- [#191](https://github.com/tajo/ladle/pull/191) [`3209be6`](https://github.com/tajo/ladle/commit/3209be62042ffe700f505ca84e468998288e44bd) Thanks [@tajo](https://github.com/tajo)! - Upgrade to Vite 3. It should not be a big breaking change for Ladle, but we expose the whole `vite.config.js` so you might run into some deprecations. [Read more](https://vitejs.dev/blog/announcing-vite3.html) to see if this could impact you.

  Vite 3 also ships as ESM module. That forces us to stop distributing `@ladle/react-cjs`. We used it for our internal yarn pnp setup but we don't need it anymore. Pure ESM everywhere!

### Minor Changes

- [#194](https://github.com/tajo/ladle/pull/194) [`63c8821`](https://github.com/tajo/ladle/commit/63c88217bc6b80f1e0809c91f3cce2efdd64ffdc) Thanks [@tajo](https://github.com/tajo)! - Bump all repo dependencies do the latest and abandon cjs build&publish.

### Patch Changes

- [#191](https://github.com/tajo/ladle/pull/191) [`3209be6`](https://github.com/tajo/ladle/commit/3209be62042ffe700f505ca84e468998288e44bd) Thanks [@tajo](https://github.com/tajo)! - Uses hook version for iframe window ref to prevent some re-renders. Fix viewport when navigating from a different story.

* [#193](https://github.com/tajo/ladle/pull/193) [`e573adc`](https://github.com/tajo/ladle/commit/e573adcfeeb8ea5d78566e5ce0ac3495eed77734) Thanks [@tajo](https://github.com/tajo)! - Improve the kebab casing of story names to convert MapSDK into map-sdk and not map-s-d-k.

- [#194](https://github.com/tajo/ladle/pull/194) [`63c8821`](https://github.com/tajo/ladle/commit/63c88217bc6b80f1e0809c91f3cce2efdd64ffdc) Thanks [@tajo](https://github.com/tajo)! - Add margin 0 to iframe's body just as Stackblitz workaround

* [#191](https://github.com/tajo/ladle/pull/191) [`3209be6`](https://github.com/tajo/ladle/commit/3209be62042ffe700f505ca84e468998288e44bd) Thanks [@tajo](https://github.com/tajo)! - Find a free port for HMR server. Before, if there were multiple instances of Ladle, the client would always connect to the initial HMR server and reloads didn't work.

## 1.3.0

### Minor Changes

- [#190](https://github.com/tajo/ladle/pull/190) [`21959e9`](https://github.com/tajo/ladle/commit/21959e96878c65681a090b32d82028bd9470e030) Thanks [@tajo](https://github.com/tajo)! - Add addon-width and iframe mode. You can set `meta.width` and `meta.iframed` to render stories inside an iframe. This is useful for testing responsiveness or components like modals that occupy the full screen.

* [`1745a95`](https://github.com/tajo/ladle/commit/1745a95eb664404db51168a4adaeec2f87841044) Thanks [@tajo](https://github.com/tajo)! - Add support for native Windows.

### Patch Changes

- [#188](https://github.com/tajo/ladle/pull/188) [`2f142cc`](https://github.com/tajo/ladle/commit/2f142cc2d8354b120236d29d4cc78132a6510a55) Thanks [@pdeslaur](https://github.com/pdeslaur)! - Fix compatibility issue with `resolve.alias` vite config to fix issue tajo/ladle#187.

* [#187](https://github.com/tajo/ladle/pull/187) [`ebb1923`](https://github.com/tajo/ladle/commit/ebb192340a331756ce49424ee823435814bf5611) Thanks [@tajo](https://github.com/tajo)! - Move background color to negative z-index to support cases when components use some negative z-indexes as well.

- [#189](https://github.com/tajo/ladle/pull/189) [`f84bbde`](https://github.com/tajo/ladle/commit/f84bbdeada095746698434b18b79d7d751dd631c) Thanks [@tajo](https://github.com/tajo)! - Improve the performance of virtual stories modules. `fs.promises.readFile` is much slower than `fs.promises.readSync` and it blocking CPU doesn't matter in our use case anyway. Also don't run the story watcher on the startup.

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

* [#166](https://github.com/tajo/ladle/pull/166) [`14a1619`](https://github.com/tajo/ladle/commit/14a1619b89ea43b94816ab088897a7311cf587f9) Thanks [@tajo](https://github.com/tajo)! - Align `server.open` more with the official Vite API.

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

  Ladle was unable to handle `vite.config.ts` the way Vite does.
  For example, Ladle was unable to load `vite.config.ts` which imported other TS modules.

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

- [#147](https://github.com/tajo/ladle/pull/147) [`f9a4965`](https://github.com/tajo/ladle/commit/f9a4965e8a7940f9aa41df2c2c8418d37f9f0d35) Thanks [@tajo](https://github.com/tajo)! - Add generic Axe check for (mostly) empty Ladle instance to make sure projects running axe don't have a problem with Ladle.

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

- [#137](https://github.com/tajo/ladle/pull/137) [`515d069`](https://github.com/tajo/ladle/commit/515d0696665df786e45b5c76aed88239c68cdf24) Thanks [@tajo](https://github.com/tajo)! - Allow TypeScript typecast default export syntax when parsing stories.

* [#135](https://github.com/tajo/ladle/pull/135) [`c027c8c`](https://github.com/tajo/ladle/commit/c027c8c0a8a2442317b068787c039a580bf2c502) Thanks [@tajo](https://github.com/tajo)! - Surface all errors that happen during the story discovery (parsing) stage. Show them in the UI (a new landing page) and the CLI. Adds information how to deal with them as well.

- [#136](https://github.com/tajo/ladle/pull/136) [`fa8db60`](https://github.com/tajo/ladle/commit/fa8db60ceba04e9d0fab519ad4b3b84e88ba412d) Thanks [@tajo](https://github.com/tajo)! - Undo some basic CSS resets from normalize/preflight that impact Ladle's UI when used.

* [#138](https://github.com/tajo/ladle/pull/138) [`e2069f4`](https://github.com/tajo/ladle/commit/e2069f4b3d2b0b69a034c28e508a171ce011c45a) Thanks [@tajo](https://github.com/tajo)! - Add a section explaining the limitations of story syntax - some parts need to be static so they can be parsed.

- [#126](https://github.com/tajo/ladle/pull/126) [`0a44aa2`](https://github.com/tajo/ladle/commit/0a44aa2a1b40f392db3163cddfdae7633771edec) Thanks [@beckend](https://github.com/beckend)! - feat: allow configuration of the whole Vite config.resolve object

## 0.15.0

### Minor Changes

- d40aa73: Changing the tooling to turborepo

### Patch Changes

- 2c7263c: Remove conventional commits
