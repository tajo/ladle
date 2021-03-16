import { startServer } from "snowpack";
//import { clearCache } from "snowpack/lib/util.js";
import getPort from "get-port";
import path from "path";
import getSnowpackConfig, { getCustomMounts } from "./snowpack-base.js";
import debug from "./debug.js";

/**
 * @param config {import("../shared/types").Config}
 * @param configFolder {string}
 */
const bundler = async (config, configFolder) => {
  const port = await getPort({
    port: [config.serve.port, 61001, 62002, 62003, 62004, 62005],
  });
  debug(`Port set to: ${port}`);
  try {
    const snowpackConfig = await getSnowpackConfig(
      {
        devOptions: {
          port,
          output: config.serve.output,
          open: config.serve.open,
        },
        babelPlugins: config.babelPlugins,
        babelPresets: config.babelPresets,
        root: config.root,
        packageOptions: config.packageOptions,
        mount: getCustomMounts(config.mount),
      },
      { storyGlob: config.stories, configFolder },
    );
    const server = await startServer({
      config: snowpackConfig,
      lockfile: null,
    });
    server.onFileChange(async ({ filePath }) => {
      if (
        filePath === path.join(configFolder, "config.mjs") ||
        filePath === path.join(configFolder, "config.js")
      ) {
        console.log("Config changed. Please start dev server again.");
        await server.shutdown();
        process.exit(0);
        //await clearCache();
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export default bundler;
