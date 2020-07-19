const globby = require("globby");
const path = require("path");
const fs = require("fs").promises;
const makeDir = require("make-dir");
const cpy = require("cpy");
const getList = require("./get-list");
const { appPath, cachePath, storyGlob } = require("./const");

(async () => {
  await makeDir(cachePath);
  await cpy([`${__dirname}/app/**/*.{html,jsx}`], cachePath);
  const entries = await globby([storyGlob]);
  console.log(entries);
  const list = await getList(entries);
  await fs.writeFile(path.join(cachePath, "list.js"), list);
  console.log(list);
})();
