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

// replacing process.cwd()
const getDefConfig = fs.readFileSync("cjs/lib/app/src/def-config.ts", "utf8");
fs.writeFile(
  "./cjs/lib/app/src/def-config.ts",
  getDefConfig.replace("process.cwd()", "'/'"),
  (err) => {
    if (err) return console.log(err);
    console.log("cjs/lib/app/src/def-config.ts updated");
  },
);
