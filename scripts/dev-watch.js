// this is a continuously running script for developers of fastbook
// it watches changes in /libs, compiles typescript and copies files
// .fastbook/app cach, similar to tsc-watch

const chokidar = require("chokidar");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const cpy = require("cpy");
const { promises: fs } = require("fs");

let initialScanComplete = false;

const cachePath = `${process.cwd()}/.fastbook/app`;

const update = async () => {
  console.log("tsc: start");

  // tsc compile
  try {
    const { stdout, stderr } = await exec(
      "yarn tsc --project tsconfig.cli.json"
    );
    stderr && console.error(stderr);
    console.log("tsc: done");
  } catch (e) {
    console.error(e.stdout);
  }
};

chokidar
  .watch("lib/**/*.{ts,tsx}")
  .on("add", async (path) => {
    if (!initialScanComplete) return;
    await update();
  })
  .on("change", async (path) => {
    console.log(path);
    await update();
  })
  .on("ready", async () => {
    initialScanComplete = true;
    await update();
  });
