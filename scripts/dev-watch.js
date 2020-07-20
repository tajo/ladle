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
    const { stdout, stderr } = await exec("yarn tsc");
    stderr && console.error(stderr);
    console.log("tsc: done");
  } catch (e) {
    console.error(e.stdout);
  }

  // copy other lib/app files over to dist/app
  await cpy(
    [`${process.cwd()}/lib/app/**/*.html`],
    `${process.cwd()}/dist/app`
  );

  // copy app into cache
  await cpy(
    [`${process.cwd()}/dist/app/**/*.{html,tsx,ts,js,jsx}`],
    cachePath,
    {
      // don't copy files that are same, prevents cache busting
      filter: async (file) => {
        const toPath = file.path.replace(
          `${process.cwd()}/dist/app`,
          cachePath
        );
        try {
          const toCode = await fs.readFile(toPath, "utf8");
          const fromCode = await fs.readFile(file.path, "utf8");
          if (toCode !== fromCode) {
            console.log(`update: ${toPath}`);
            return true;
          }
        } catch (e) {
          console.log(`update: ${toPath}`);
          return true;
        }
        return false;
      },
    }
  );
};

chokidar
  .watch("lib/**/*.{ts,tsx,html}")
  .on("add", async (path) => {
    if (!initialScanComplete) return;
    await update();
  })
  .on("change", async (path) => {
    await update();
  })
  .on("ready", async () => {
    initialScanComplete = true;
    await update();
  });
