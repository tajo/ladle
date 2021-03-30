import { build, logger } from "snowpack";
import getSnowpackConfig, { getCustomMounts } from "./snowpack-base.js";

/**
 * @param config {import("../shared/types").Config}
 * @param configFolder {string}
 */
const snowpackProd = async (config, configFolder) => {
  let successfulExit = true;
  try {
    const buildConfig = await getSnowpackConfig(
      {
        mount: getCustomMounts(config.mount),
        babelPlugins: config.babelPlugins,
        babelPresets: config.babelPresets,
        root: config.root,
        packageOptions: config.packageOptions,
        buildOptions: {
          clean: true,
          baseUrl: config.build.baseUrl,
          sourcemap: config.build.sourcemap,
          out: config.build.out,
        },
        optimize: config.build.optimize
          ? {
              bundle: true,
              minify: true,
              splitting: true,
              treeshake: true,
              target: "es2020",
            }
          : undefined,
      },
      { storyGlob: config.stories, configFolder },
    );
    logger.on("error", (e) => {
      console.log(e);
      successfulExit = false;
    });
    await build({ config: buildConfig, lockfile: null });
  } catch (e) {
    console.log(e);
    return false;
  }
  return successfulExit;
};

export default snowpackProd;
