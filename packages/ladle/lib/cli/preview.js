#!/usr/bin/env node

import vitePreview from "./vite-preview.js";
import debug from "./debug.js";
import applyCLIConfig from "./apply-cli-config.js";

/**
 * @param params {import("../shared/types").DevParams}
 */
const preview = async (params = {}) => {
  debug("Starting preview command");
  const { configFolder, config } = await applyCLIConfig(params);
  await vitePreview(config, configFolder);
};

export default preview;
