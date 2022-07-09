#!/usr/bin/env zx
import "zx/globals";

await fs.copy("lib/app", "cjs/lib/app");
await $`pnpm babel lib/cli --out-dir cjs/lib/cli --plugins=@babel/plugin-transform-modules-commonjs`;
await $`pnpm babel lib/shared --out-dir cjs/lib/shared --plugins=@babel/plugin-transform-modules-commonjs`;
await $`pnpm babel api --out-dir cjs/api --plugins=@babel/plugin-transform-modules-commonjs`;
await fs.copy("lib/shared/types.ts", "cjs/lib/shared/types.ts");
await fs.copy(
  "lib/cli/openChrome.applescript",
  "cjs/lib/cli/openChrome.applescript",
);
await fs.copy("lib/shared/default-config.js", "cjs/lib/app/src/def-config.ts");
await $`node ./build-cjs.js`;
