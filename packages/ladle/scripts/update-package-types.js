import { preparePackageJsonForPublish } from "./package-types-helpers.js";
import fs from "fs";

const pkgJson = JSON.parse(fs.readFileSync("./packages/ladle/package.json"));
// write out old package.json to a temp file that won't be published
fs.writeFileSync(
  "./packages/ladle/backup-package.json",
  JSON.stringify(pkgJson, null, 2),
);
// update existing package.json
preparePackageJsonForPublish(pkgJson);
// write updates to package.json
fs.writeFileSync(
  "./packages/ladle/package.json",
  JSON.stringify(pkgJson, null, 2),
);
