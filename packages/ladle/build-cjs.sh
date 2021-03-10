#!/usr/bin/env bash

mkdir -p cjs/lib
cp -R lib/app cjs/lib/app
yarn babel lib/cli --out-dir cjs/lib/cli --plugins=@babel/plugin-transform-modules-commonjs
yarn babel lib/shared --out-dir cjs/lib/shared --plugins=@babel/plugin-transform-modules-commonjs
cp lib/shared/types.ts cjs/lib/shared/types.ts
./build-cjs.js
