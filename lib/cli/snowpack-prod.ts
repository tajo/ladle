import { build } from "snowpack";
import getSnowpackConfig from "./snowpack-base";
import type { BuildParamsT } from "./types";

const snowpackProd = async (params: BuildParamsT) => {
  try {
    const config = getSnowpackConfig(
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
