import fs from "fs";
import path from "path";

/**
 * @param {string} configFolder
 */
const getConfigImport = (configFolder) => {
  const configPath = path.join(configFolder, "config.mjs");
  const configExists = fs.existsSync(configPath);
  let configCode = `export let config = {};\n`;
  if (configExists) {
    configCode += `import customConfig from '${path.join(
      configFolder,
      "config.mjs",
    )}';\nconfig = customConfig;\n`;
  }
  return `${configCode}`;
};

export default getConfigImport;
