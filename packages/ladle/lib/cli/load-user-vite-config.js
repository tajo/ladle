/* eslint-disable @typescript-eslint/no-var-requires */

// This is a bit hacky way to load both vite.config.js and vite.config.ts.
// @ladle/react is type: module but the config lives in a different project
// that doesn't have to be a module. If not, node is confused why vite.config.js
// has "export". TypeScript is also not Node friendly. So we rename .js/.ts to .mjs
// first and strip TypeScript with Babel.

import path from "path";
import fs from "fs";
//@ts-ignore
import { transformSync } from "@babel/core";
import debug from "./debug.js";

//@ts-ignore
const getConfig = async (viteConfig) => {
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
    const configMJSPath = path.join(process.cwd(), "vite.config.mjs");
    if (fs.existsSync(configTSPath)) {
      resolvedPath = configTSPath;
    }
    if (fs.existsSync(configJSPath)) {
      resolvedPath = configJSPath;
    }
    if (fs.existsSync(configMJSPath)) {
      resolvedPath = configMJSPath;
    }
  }

  if (resolvedPath === "") {
    debug(`No vite.config was found.`);
    return {};
  }

  debug(`${resolvedPath} is being loaded.`);
  let finalConfig = {};
  try {
    const originPackageJson = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "package.json"), {
        encoding: "utf-8",
      }),
    );
    const isUserESM = originPackageJson.type === "module";
    debug(`The user project is type ${isUserESM ? "module" : "commonjs"}`);
    if (resolvedPath.endsWith(".ts")) {
      const originalFile = fs.readFileSync(resolvedPath, {
        encoding: "utf-8",
      });
      const { code } = transformSync(originalFile, {
        filename: "vite.config.ts",
        presets: ["@babel/preset-typescript"],
      });
      const newResolvedPath = `${resolvedPath}${isUserESM ? ".js" : ".mjs"}`;
      fs.writeFileSync(newResolvedPath, code);
      finalConfig = await import(newResolvedPath);
      fs.unlinkSync(newResolvedPath);
    } else if (resolvedPath.endsWith(".mjs")) {
      finalConfig = await import(resolvedPath);
    } else {
      if (isUserESM) {
        finalConfig = await import(resolvedPath);
      } else {
        // if the project is not type: module, we need to load config as
        // vite.config.js.mjs
        fs.copyFileSync(
          resolvedPath,
          resolvedPath + ".mjs",
          fs.constants.COPYFILE_FICLONE,
        );
        finalConfig = await import(resolvedPath + ".mjs");
        fs.unlinkSync(resolvedPath + ".mjs");
      }
    }
  } catch (e) {
    debug(e);
    throw new Error(
      `Could not load ${resolvedPath}. Did you specify a correct viteConfig path in .ladle/config.mjs?`,
    );
  }
  // @ts-ignore
  return finalConfig.default;
};

export default getConfig;
