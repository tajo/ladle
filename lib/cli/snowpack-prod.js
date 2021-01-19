import { build } from "snowpack";
import getSnowpackConfig from "./snowpack-base.js";

/**
 * @param config {import("./types").ConfigT}
 */
const snowpackProd = async (config) => {
  try {
    const buildConfig = await getSnowpackConfig(
      {
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
    await build({ config: buildConfig, lockfile: null });
  } catch (e) {
    console.error(e);
  }
};

export default snowpackProd;
