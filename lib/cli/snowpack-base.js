import path from "path";
import fs from "fs";
// @ts-ignore
import { fileURLToPath } from "url";
import { createConfiguration } from "snowpack";

/**
 * @param {string} storyGlob
 */
const getStoryFolder = (storyGlob) => {
  const parts = storyGlob.split("/");
  if (storyGlob === "" || !fs.existsSync(path.join(process.cwd(), parts[0]))) {
    throw Error(
      `Story glob ${storyGlob} must match an existing folder. The ${parts[0]} folder was not found.`
    );
  }
  return parts[0];
};

/**
 * @param {any} extendConfig
 * @param pluginOptions {import("./types").PluginOptionsT}
 */

const getSnowpackConfig = async (extendConfig, pluginOptions) => {
  //@ts-ignore
  const configPath = path.join(process.cwd(), ".ladle");
  const configExists = fs.existsSync(configPath);
  process.env["SNOWPACK_PUBLIC_CONFIG_EXISTS"] = configExists
    ? "true"
    : "false";
  const storyFolder = getStoryFolder(pluginOptions.storyGlob);
  const dirname = fileURLToPath(import.meta.url);
  const bundlerConfig = {
    ...extendConfig,
    mount: {
      [path.join(dirname, "../../app/public/")]: { url: "/", static: false },
      [path.join(dirname, "../../app/src/")]: { url: "/" },
      [path.join(process.cwd(), storyFolder)]: { url: "/stories" },
      ...(configExists ? { [configPath]: { url: "/" } } : {}),
      ...(extendConfig.mount ? extendConfig.mount : {}),
    },
    plugins: [
      [
        path.join(dirname, "../snowpack-plugin/snowpack-plugin.js"),
        pluginOptions,
      ],
      ...(extendConfig.plugins ? extendConfig.plugins : []),
    ],
  };
  return createConfiguration(bundlerConfig);
};

export default getSnowpackConfig;
