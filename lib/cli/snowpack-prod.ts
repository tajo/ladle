import { buildProject } from "snowpack";
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
        experiments: {
          optimize: {
            bundle: true,
            minify: true,
            target: "es2020" as any,
          },
        },
      },
      { storyGlob: params.stories }
    );
    await buildProject({ config, lockfile: null, cwd: process.cwd() });
  } catch (e) {
    console.error(e);
  }
};

export default snowpackProd;
