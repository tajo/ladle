const fs = require("fs");
const path = require("path");

/**
 * @param {string} configFolder
 */
const getConfigImport = (configFolder) => {
  const configPath = path.join(configFolder, "config.mjs");
  const configExists = fs.existsSync(configPath);
  let configCode = `export let config = {};\n`;
  if (configExists) {
    configCode += `import customConfig from '${path.relative(
      path.join(__dirname, "../../../app/src"),
      path.join(configFolder, "config.mjs"),
    )}';\nconfig = customConfig;\n`;
  }
  return `${configCode}`;
};

module.exports = getConfigImport;
