#!/usr/bin/env node

let oldTypes = null;
let oldExports = null;

export function preparePackageJsonForPublish(packageJson) {
  oldTypes = packageJson.types;
  packageJson.types = "./typings-for-build/app/exports.d.ts";

  oldExports = JSON.parse(JSON.stringify(packageJson.exports));
  packageJson.exports["."] = {
    types: {
      import: "./typings-for-build/app/exports.d.ts",
      require: "./typings-for-build/app/exports.d.cts",
    },
    default: "./lib/app/exports.ts",
  };

  return packageJson;
}

export function revertPackageJson(packageJson) {
  if (!oldTypes) {
    console.warn(`'oldTypes' is not defined, so we are unable to revert it`);
  }

  if (!oldExports) {
    console.warn(`'oldExports' is not defined, so we are unable to revert it`);
  }

  packageJson.types = oldTypes ?? packageJson.types;
  oldTypes = null;

  packageJson.exports = oldExports ?? packageJson.exports;
  oldExports = null;

  return packageJson;
}
