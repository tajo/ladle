#!/usr/bin/env node
import { Command } from "commander";
import serve from "./serve.js";
import build from "./build.js";
import preview from "./preview.js";

/**
 * @param {string} n
 */
const strToInt = (n) => parseInt(n, 10);

const program = new Command("ladle");
program.showHelpAfterError().showSuggestionAfterError();

program
  .command("serve")
  .alias("dev")
  .description("start developing")
  .option("-h, --host [string]", "host to serve the application")
  .option("-p, --port [number]", "port to serve the application", strToInt)
  .option("--stories [string]", "glob to find stories")
  .option("--theme [string]", "theme light, dark or auto")
  .option("--config [string]", "folder where config is located, default .ladle")
  .option("--viteConfig [string]", "file with Vite configuration")
  .option("--base [string]", "base URL path for build output")
  .option("--mode [string]", "Vite mode")
  .option("--noWatch", "Disable file system watching")
  .action(serve);

program
  .command("build")
  .description("build static production app")
  .option("-o, --outDir <path>", "output directory")
  .option("--stories [string]", "glob to find stories")
  .option("--theme [string]", "theme light, dark or auto")
  .option("--config [string]", "folder where config is located, default .ladle")
  .option("--viteConfig [string]", "file with Vite configuration")
  .option("--base [string]", "base URL path for build output")
  .option("--mode [string]", "Vite mode")
  .action(async (params) => {
    const success = await build(params);
    if (success) {
      process.exit(0);
    }
    process.exit(1);
  });

program
  .command("preview")
  .description("start a server to preview the build in outDir")
  .option("-o, --outDir <path>", "output directory")
  .option("-h, --host [string]", "host to serve the application")
  .option("-p, --port [number]", "port to serve the application", strToInt)
  .option("--config [string]", "folder where config is located, default .ladle")
  .option("--viteConfig [string]", "file with Vite configuration")
  .option("--base [string]", "base URL path for build output")
  .option("--mode [string]", "Vite mode")
  .action(async (params) => {
    await preview({
      ...params,
      previewHost: params.host,
      previewPort: params.port,
    });
  });

program.parse(process.argv);
