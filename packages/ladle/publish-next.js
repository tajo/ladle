#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import {
  preparePackageJsonForPublish,
  revertPackageJson,
} from "./scripts/package-types-helpers.js";

const shortHash = execSync("git rev-parse --short HEAD").toString().trim();
const version = `0.0.0-next-${shortHash}`;

console.log(`Publishing @ladle/react ${version}`);

const pkgJson = JSON.parse(fs.readFileSync("./package.json"));
const oldVersion = pkgJson.version;
const oldContextVersion = pkgJson.dependencies["@ladle/react-context"];
pkgJson.version = version;
pkgJson.dependencies["@ladle/react-context"] = oldContextVersion.split(":")[1];
preparePackageJsonForPublish(pkgJson);
fs.writeFileSync("./package.json", JSON.stringify(pkgJson, null, 2));

try {
  execSync("npm publish --tag next");
} catch (e) {
  console.log(e);
  console.log("Publish failed, reverting package.json");
}

pkgJson.version = oldVersion;
pkgJson.dependencies["@ladle/react-context"] = oldContextVersion;
revertPackageJson(pkgJson);
fs.writeFileSync("./package.json", JSON.stringify(pkgJson, null, 2));
