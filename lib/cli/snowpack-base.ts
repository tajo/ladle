import path from "path";
import fs from "fs";
import { createConfiguration } from "snowpack";
import type { PluginOptionsT } from "./types";

const getStoryFolder = (storyGlob: string) => {
  const parts = storyGlob.split("/");
  if (storyGlob === "" || !fs.existsSync(path.join(process.cwd(), parts[0]))) {
    throw Error(
      `Story glob ${storyGlob} must match an existing folder. The ${parts[0]} folder was not found.`
    );
  }
  return parts[0];
};

const getSnowpackConfig = (
  extendConfig: any = {},
  pluginOptions: PluginOptionsT
) => {
  const storyFolder = getStoryFolder(pluginOptions.storyGlob);
  const bundlerConfig = {
    root: process.cwd(),
    mount: {
      "lib/app/public/": { url: "/", static: false },
      "lib/app/src": { url: "/" },
      "dist/app/src": { url: "/" },
      [storyFolder]: { url: "/stories" },
      ...(extendConfig.mount ? extendConfig.mount : {}),
    },
    plugins: [
      [path.join(__dirname, "./snowpack-plugin.js"), pluginOptions],
      ...(extendConfig.plugins ? extendConfig.plugins : []),
    ],
    ...extendConfig,
  };
  return createConfiguration(bundlerConfig);
};

export default getSnowpackConfig;
