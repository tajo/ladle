/* eslint-disable @typescript-eslint/no-var-requires */

// This is a bit hacky way to load both vite.config.js and vite.config.ts.
// @ladle/react is type: module but the config lives in a different project
// that doesn't have to be a module. If not, node is confused why vite.config.js
// has "export". TypeScript is also not Node friendly. So we just transform
// both into commonjs through babel. This file can be imported into our ESM node CLI.

const path = require("path");

require("@babel/register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  presets: [
    "@babel/preset-typescript",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "16",
        },
      },
    ],
  ],
});

const getConfig = (configFile) => {
  if (configFile) {
    if (path.isAbsolute(configFile)) {
      return require(configFile);
    }
    return require(path.join(process.cwd(), configFile));
  } else {
    let userConfigJS;
    let userConfigTS;

    try {
      userConfigJS = require(path.join(process.cwd(), "vite.config.js"));
      userConfigTS = require(path.join(process.cwd(), "vite.config.ts"));
    } catch (e) {}

    if (userConfigJS && userConfigTS) {
      throw new Error(
        "You can't have both vite.config.js and vite.config.ts files in your project.",
      );
    }

    if (userConfigJS) return userConfigJS;
    if (userConfigTS) return userConfigTS;
    return {};
  }
};

module.exports = getConfig;
