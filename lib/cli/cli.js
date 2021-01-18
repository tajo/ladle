#!/usr/bin/env node
import program from "commander";
import path from "path";
import serve from "./serve.js";
import build from "./build.js";
import { storyGlob } from "./const.js";

/**
 * @param {string} n
 */
const strToInt = (n) => parseInt(n, 10);

program
  .command("serve")
  .description("start developing")
  .option("-s, --stories [string]", "glob to find stories", storyGlob)
  .option(
    "-p, --port [number]",
    "port to serve the application",
    strToInt,
    61000
  )
  .option("--theme [string]", "theme (light, dark, auto)", "light")
  .version("0.0.1")
  .action(serve);

program
  .command("build")
  .description("build static production app")
  .option("-s, --stories [string]", "glob to find stories", storyGlob)
  .option(
    "-o, --out-dir <path>",
    "output directory",
    path.join(process.cwd(), "build")
  )
  .option("--theme [string]", "theme (light, dark, auto)", "light")
  .version("0.0.1")
  .action(build);

program.parse(process.argv);
