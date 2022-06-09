/* eslint-disable @typescript-eslint/no-var-requires */

// This is a bit hacky way to load both vite.config.js and vite.config.ts.
// @ladle/react is type: module but the config lives in a different project
// that doesn't have to be a module. If not, node is confused why vite.config.js
// has "export". TypeScript is also not Node friendly. So we just transform
// both into commonjs through babel. This file can be imported into our ESM node CLI.

//@ts-ignore
require("@babel/register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  extensions: [".ts", ".js"],
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

const path = require("path");
const fs = require("fs");
const debug = require("debug")("ladle:cli");

//@ts-ignore
const getConfig = (viteConfig) => {
  let resolvedPath = "";
  if (viteConfig) {
    if (path.isAbsolute(viteConfig)) {
      resolvedPath = viteConfig;
    } else {
      resolvedPath = path.join(process.cwd(), viteConfig);
    }
  } else {
    const configTSPath = path.join(process.cwd(), "vite.config.ts");
    const configJSPath = path.join(process.cwd(), "vite.config.js");
    if (fs.existsSync(configTSPath)) {
      resolvedPath = configTSPath;
    }
    if (fs.existsSync(configJSPath)) {
      resolvedPath = configJSPath;
    }
  }

  if (resolvedPath === "") {
    debug(`No vite.config was found.`);
    return {};
  }

  debug(`${resolvedPath} is being loaded.`);
  let finalConfig = {};
  try {
    if (resolvedPath.endsWith(".ts")) {
      // before we can register loaders without requiring users to run node
      // with --experimental-loader themselves, we have to do a hack here:
      // bundle the config file w/ ts transforms first, write it to disk,
      // load it with native Node ESM, then delete the file.
      fs.copyFileSync(
        resolvedPath,
        resolvedPath + ".js",
        fs.constants.COPYFILE_EXCL,
      );
      finalConfig = require(resolvedPath + ".js");
      fs.unlinkSync(resolvedPath + ".js");
    } else {
      // using Function to avoid this from being compiled away by TS/Rollup
      // append a query so that we force reload fresh config in case of
      // server restart
      finalConfig = require(resolvedPath);
    }
  } catch (e) {
    debug(e);
    throw new Error(
      `Could not load ${resolvedPath}. Did you specify a correct viteConfig path in .ladle/config.mjs?`,
    );
  }
  return finalConfig;
};

module.exports = getConfig;
