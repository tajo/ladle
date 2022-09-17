import fs from "fs";
import path from "path";
import cleanupWindowsPath from "./cleanup-windows-path.js";

/**
 * @param {string} configFolder
 */
const getConfigImport = (configFolder) => {
  const configPath = path.join(configFolder, "config.mjs");
  const configExists = fs.existsSync(configPath);
  let configCode = `export let config = {};\n`;
  if (configExists) {
    configCode += `import customConfig from '${cleanupWindowsPath(
      path.join(configFolder, "config.mjs"),
    )}';\nconfig = customConfig;\n`;
  }
  return `${configCode}`;
};

export default getConfigImport;
