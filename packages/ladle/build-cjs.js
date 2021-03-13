#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

import fs from "fs";

// package.json
const manifestRaw = fs.readFileSync("package.json");
const manifest = JSON.parse(manifestRaw);

manifest.name = "@ladle/react-cjs";
delete manifest.type;
delete manifest.module;

fs.writeFile(
  "./cjs/package.json",
  JSON.stringify(manifest, undefined, "  "),
  (err) => {
    if (err) return console.log(err);
    console.log("package.json updated");
  },
);

// replacing import.meta usage
const spbase = fs.readFileSync("cjs/lib/cli/snowpack-base.js", "utf8");
fs.writeFile(
  "./cjs/lib/cli/snowpack-base.js",
  spbase
    .replace("(0, _module.createRequire)(import.meta.url)", "require")
    .replace(
      "(0, _url.fileURLToPath)(import.meta.url)",
      "`${__dirname}/snowpack-base.js`",
    ),
  (err) => {
    if (err) return console.log(err);
    console.log("lib/cli/snowpack-base.js updated");
  },
);

// replacing default config import
const getConfig = fs.readFileSync("cjs/lib/app/src/get-config.ts", "utf8");
fs.writeFile(
  "./cjs/lib/app/src/get-config.ts",
  getConfig.replace("../../shared/default-config", "./def-config"),
  (err) => {
    if (err) return console.log(err);
    console.log("cjs/lib/app/src/get-config.ts updated");
  },
);
