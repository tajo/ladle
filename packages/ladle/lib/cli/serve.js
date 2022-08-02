#!/usr/bin/env node

import viteDev from "./vite-dev.js";
import debug from "./debug.js";
import applyCLIConfig from "./apply-cli-config.js";

/**
 * @param params {import("../shared/types").CLIParams}
 */
const serve = async (params = {}) => {
  debug("Starting serve command");
  const { configFolder, config } = await applyCLIConfig(params);
  await viteDev(config, configFolder);
};

export default serve;
