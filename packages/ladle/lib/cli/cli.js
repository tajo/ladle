#!/usr/bin/env node
import { program } from "commander";
import serve from "./serve.js";
import build from "./build.js";

/**
 * @param {string} n
 */
const strToInt = (n) => parseInt(n, 10);

program.showHelpAfterError().showSuggestionAfterError();

program
  .command("serve")
  .description("start developing")
  .option("-p, --port [number]", "port to serve the application", strToInt)
  .option("--stories [string]", "glob to find stories")
  .option("--theme [string]", "theme light, dark or auto")
  .option(
    "--config [string]",
    "folder where Ladle configs are located, default .ladle",
  )
  .option("--viteConfig [string]", "file with Vite configuration")
  .action(async (params) => {
    await serve({ ...params, serve: params });
  });
program
  .command("build")
  .description("build static production app")
  .option("-o, --outDir <path>", "output directory")
  .option("--stories [string]", "glob to find stories")
  .option("--theme [string]", "theme light, dark or auto")
  .option("--config [string]", "folder where config is located, default .ladle")
  .option("--viteConfig [string]", "file with Vite configuration")
  .action(async (params) => {
    const success = await build({ ...params, build: params });
    if (success) {
      process.exit(0);
    }
    process.exit(1);
  });

program.parse(process.argv);
