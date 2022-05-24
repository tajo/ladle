import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @param {string} configFolder
 */
const getConfigImport = (configFolder) => {
  const configPath = path.join(configFolder, "config.mjs");
  const configExists = fs.existsSync(configPath);
  let configCode = `export let config = {};\n`;
  if (configExists) {
    configCode += `import customConfig from '${path
      .relative(
        path.join(__dirname, "../../../app/src"),
        path.join(configFolder, "config.mjs"),
      )
      .slice(2)}';\nconfig = customConfig;\n`;
  }
  return `${configCode}`;
};

export default getConfigImport;
