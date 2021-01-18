import { build } from "snowpack";
import getSnowpackConfig from "./snowpack-base.js";

/**
 * @param params {import("./types").BuildParamsT}
 */
const snowpackProd = async (params) => {
  try {
    const config = await getSnowpackConfig(
      {
        buildOptions: {
          clean: true,
          out: params.outDir,
        },
        // optimize: {
        //   bundle: true,
        //   minify: true,
        //   splitting: true,
        //   target: "es2020" as any,
        //   format: "esm",
        // },
      },
      { storyGlob: params.stories }
    );
    await build({ config, lockfile: null });
  } catch (e) {
    console.error(e);
  }
};

export default snowpackProd;
