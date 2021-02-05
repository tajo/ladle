import { build, logger } from "snowpack";
import getSnowpackConfig, { getCustomMounts } from "./snowpack-base.js";

/**
 * @param config {import("../shared/types").Config}
 */
const snowpackProd = async (config) => {
  let successfulExit = true;
  try {
    const buildConfig = await getSnowpackConfig(
      {
        mount: getCustomMounts(config.mount),
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
      { storyGlob: config.stories }
    );
    logger.on("error", (e) => {
      console.log(e);
      successfulExit = false;
    });
    await build({ config: buildConfig, lockfile: null });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
  if (successfulExit) {
    process.exit(0);
  }
  process.exit(1);
};

export default snowpackProd;
