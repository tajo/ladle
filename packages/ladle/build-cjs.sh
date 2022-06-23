#!/usr/bin/env bash

mkdir -p cjs/lib
cp -R lib/app cjs/lib
pnpm babel lib/cli --out-dir cjs/lib/cli --plugins=@babel/plugin-transform-modules-commonjs
pnpm babel lib/shared --out-dir cjs/lib/shared --plugins=@babel/plugin-transform-modules-commonjs
pnpm babel api --out-dir cjs/api --plugins=@babel/plugin-transform-modules-commonjs
cp lib/shared/types.ts cjs/lib/shared/types.ts
cp lib/cli/openChrome.applescript cjs/lib/cli/openChrome.applescript
cp lib/shared/default-config.js cjs/lib/app/src/def-config.ts
./build-cjs.js
