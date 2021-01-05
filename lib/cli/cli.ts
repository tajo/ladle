#!/usr/bin/env node
import program from "commander";
import serve from "./serve";
import build from "./build";
import path from "path";
// @ts-ignore
import packageJson from "../../package.json";
import { storyGlob } from "./const";

const strToInt = (n: string) => parseInt(n, 10);

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
  .option("--theme [string]", "theme (light, dark, auto)", "light")
  .version(packageJson.version)
  .action(build);

program.parse(process.argv);
