#!/usr/bin/env node

import program from "commander";
import serve from "./serve";
import build from "./build";
import path from "path";
// @ts-ignore
import packageJson from "../../package.json";
import { storyGlob } from "./const";

program
  .command("serve")
  .description("start developing")
  .option("-s, --stories [string]", "glob to find stories", storyGlob)
  .option(
    "-p, --port [number]",
    "port to serve the application",
    parseInt,
    61000
  )
  .option("--hotPort [number]", "port for hot reload", parseInt, 1234)
  .option(
    "--cache-dir <path>",
    "cache directory",
    path.join(process.cwd(), ".ladle")
  )
  .version(packageJson.version)
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
  .option(
    "--cache-dir <path>",
    "cache directory",
    path.join(process.cwd(), ".ladle")
  )
  .version(packageJson.version)
  .action(build);

program.parse(process.argv);
