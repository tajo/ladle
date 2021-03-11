const fs = require("fs");
const path = require("path");

/**
 * @param {string} configFolder
 */
const getConfigImport = (configFolder) => {
  const configPath = path.join(configFolder, "config.mjs");
  const configExists = fs.existsSync(configPath);
  const relativePath = "./config.js";
  let configCode = `export let config = {};\n`;
  if (configExists) {
    configCode += `import customConfig from '${relativePath}';\nconfig = customConfig;\n`;
  }
  return `${configCode}`;
};

module.exports = getConfigImport;
