#!/usr/bin/env node

import path from "path";
import vitePreview from "./vite-preview.js";
import loadConfig from "./load-config.js";
import debug from "./debug.js";

/**
 * @param params {import("../shared/types").DevParams}
 */
const preview = async (params = {}) => {
  debug("Starting preview command");
  debug(`CLI port: ${params.port ? params.port : "undefined"}`);
  params.config = params.config || ".ladle";
  const configFolder = path.isAbsolute(params.config)
    ? params.config
    : path.join(process.cwd(), params.config);
  const config = await loadConfig(configFolder);
  config.previewPort = params.previewPort
    ? params.previewPort
    : config.previewPort;
  config.outDir = params.outDir ? params.outDir : config.outDir;
  config.viteConfig = params.viteConfig ? params.viteConfig : config.viteConfig;
  debug(`Final config:\n${JSON.stringify(config, null, "  ")}`);
  await vitePreview(config, configFolder);
};

export default preview;
