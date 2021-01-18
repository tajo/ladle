import { startServer } from "snowpack";
//import { clearCache } from "snowpack/lib/util.js";
import getPort from "get-port";
import path from "path";
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
    const server = await startServer({ config, lockfile: null });
    server.onFileChange(async ({ filePath }) => {
      if (filePath === path.join(process.cwd(), "./.ladle/config.mjs")) {
        console.log("Config changed. Please start dev server again.");
        await server.shutdown();
        process.exit(0);
        //await clearCache();
      }
    });
  } catch (e) {
    console.error(e);
  }
};

export default bundler;
