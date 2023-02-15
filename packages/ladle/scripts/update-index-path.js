#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const indexPath = path.join(__dirname, "../typings-for-build/app/index.html");
const index = fs.readFileSync(indexPath, "utf8");

fs.writeFileSync(
  indexPath,
  index
    .replace("index.tsx", "index.js")
    .replace("init-side-effects.ts", "init-side-effects.js"),
);
