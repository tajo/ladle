import fs from "fs";
import path from "path";

/**
 * @param {string} configFolder
 */
const getConfigImport = async (configFolder) => {
  const configPath = path.join(configFolder, "config.mjs");
  const configExists = fs.existsSync(configPath);
  let configCode = `export let config = {};\n`;
  if (configExists) {
    const config = (await import(configPath)).default;
    let serializedConfig = {};
    try {
      serializedConfig = JSON.stringify({
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
      });
    } catch (e) {
      console.log(
        `config.stories, config.addons, config.defaultStory, config.base, config.mode and config.storyOrder need to be serializable.`,
      );
      process.exit(1);
    }
    configCode += `\nconfig = ${serializedConfig};\n`;
  }
  return `${configCode}`;
};

export default getConfigImport;
