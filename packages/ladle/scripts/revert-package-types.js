import fs from "fs";

const pkgJson = JSON.parse(
  fs.readFileSync("./packages/ladle/backup-package.json"),
);
// write updates to package.json
fs.writeFileSync(
  "./packages/ladle/package.json",
  JSON.stringify(pkgJson, null, 2),
);
// remove backup file
fs.rmSync("./packages/ladle/backup-package.json");
