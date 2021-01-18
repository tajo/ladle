import { startServer } from "snowpack";
import getPort from "get-port";
import getSnowpackConfig from "./snowpack-base.js";
import loadConfig from "./load-config.js";

/**
 * @param params {import("./types").DevParamsT}
 */
const bundler = async (params) => {
  await loadConfig();
  const port = await getPort({
    port: [params.port, 61001, 62002, 62003, 62004, 62005],
  });
  try {
    const config = await getSnowpackConfig(
      {
        devOptions: {
          port,
          output: "stream",
          open: "none",
        },
        plugins: ["@snowpack/plugin-react-refresh"],
      },
      { storyGlob: params.stories }
    );
    await startServer({ config, lockfile: null });
  } catch (e) {
    console.error(e);
  }
};

export default bundler;
