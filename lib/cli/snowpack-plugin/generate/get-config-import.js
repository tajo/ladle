const fs = require("fs");
const path = require("path");

const getConfigImport = () => {
  const configPath = path.join(process.cwd(), "./.ladle/config.mjs");
  const configExists = fs.existsSync(configPath);
  const relativePath = "./config.js";
  let configCode = `export let config = {};\n`;
  if (configExists) {
    configCode += `import customConfig from '${relativePath}';\nconfig = customConfig;\n`;
  }
  return `${configCode}`;
};

module.exports = getConfigImport;
