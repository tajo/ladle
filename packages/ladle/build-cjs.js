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

const filesWithDirname = [
  "./cjs/lib/cli/vite-base.js",
  "./cjs/lib/cli/vite-plugin/generate/get-components-import.js",
  "./cjs/lib/cli/vite-plugin/generate/get-config-import.js",
  "./cjs/lib/cli/vite-plugin/generate/get-story-imports.js",
  "./cjs/lib/cli/vite-plugin/parse/get-entry-data.js",
  "./cjs/lib/cli/vite-plugin/generate/get-story-list.js",
];

filesWithDirname.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  fs.writeFile(
    file,
    content
      .replace(
        `const __dirname = (0, _path.dirname)((0, _url.fileURLToPath)(import.meta.url));`,
        "",
      )
      .replace(
        `const _dirname = _path.default.dirname((0, _url.fileURLToPath)(import.meta.url));`,
        "const _dirname = __dirname",
      )
      .replace(
        `const _require = (0, _module.createRequire)(import.meta.url);`,
        `const _require = require;`,
      )
      .replace("_template.default.default", "_template.default")
      .replace("_generator.default.default", "_generator.default")
      .replace("_traverse.default.default", "_traverse.default")
      .replace(/_types.default./gi, "_types."),
    (err) => {
      if (err) return console.log(err);
      console.log(`${file} updated`);
    },
  );
});

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
