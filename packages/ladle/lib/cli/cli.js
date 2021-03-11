#!/usr/bin/env node
import program from "commander";
import serve from "./serve.js";
import build from "./build.js";

/**
 * @param {string} n
 */
const strToInt = (n) => parseInt(n, 10);

program
  .command("serve")
  .description("start developing")
  .option("--stories [string]", "glob to find stories")
  .option("--port [number]", "port to serve the application", strToInt)
  .option("--theme [string]", "theme light, dark or auto")
  .option(
    "--open [string]",
    "open browser, e.g. chrome, firefox, safari. Set none to disable",
  )
  .option("--output [string]", "console logging, e.g. dashboard or stream")
  .option("--config [string]", "folder where config is located", ".ladle")
  .action(serve);
program
  .command("build")
  .description("build static production app")
  .option("--stories [string]", "glob to find stories")
  .option("--out <path>", "output directory")
  .option("--sourcemap", "generate source maps")
  .option("--theme [string]", "theme light, dark or auto")
  .option("--optimize", "bundle, minify, code-split and tree-shake")
  .option("--base-url [string]", "when hosted in a sub-directory, default /")
  .option("--config [string]", "folder where config is located", ".ladle")
  .action(build);

program.parse(process.argv);
