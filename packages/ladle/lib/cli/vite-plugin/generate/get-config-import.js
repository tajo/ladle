import fs from "fs";
import path from "path";
import merge from "lodash.merge";
import { pathToFileURL } from "url";

/**
 * @param config {import("../../../shared/types").Config}
 */
const ladleConfigToClientConfig = (config) => {
  return {
    ...(config.stories ? { stories: config.stories } : {}),
    ...(config.addons ? { addons: config.addons } : {}),
    ...(config.defaultStory ? { defaultStory: config.defaultStory } : {}),
    ...(config.base ? { base: config.base } : {}),
    ...(config.mode ? { mode: config.mode } : {}),
    ...(config.storyOrder
      ? {
          storyOrder: Array.isArray(config.storyOrder)
            ? config.storyOrder
            : config.storyOrder.toString(),
        }
      : {}),
  };
};

/**
 * @description Load ladle opts from file, then from the progrmatic API, select
 * a subset for the client and serialize it.
 * @param {string} configFolder
 * @param config {import("../../../shared/types").Config}
 */
const getConfigImport = async (configFolder, config) => {
  const configPath = path.join(configFolder, "config.mjs");
  let configCode = `export let config = {};\n`;
  let clientConfig = {};
  if (fs.existsSync(configPath)) {
    const fileConfig = (await import(pathToFileURL(configPath).href)).default;
    clientConfig = ladleConfigToClientConfig(fileConfig);
  }
  merge(clientConfig, ladleConfigToClientConfig(config));
  try {
    configCode = `export let config = ${JSON.stringify(clientConfig)};\n`;
  } catch (e) {
    console.log(
      `config.stories, config.addons, config.defaultStory, config.base, config.mode and config.storyOrder need to be serializable.`,
    );
    process.exit(1);
  }
  return configCode;
};

export default getConfigImport;
