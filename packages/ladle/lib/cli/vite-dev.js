import { createServer } from "vite";
import getPort from "get-port";
import debug from "./debug.js";
import getBaseViteConfig from "./vite-base.js";

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
    /**
     * @type {import('vite').InlineConfig}
     */
    const viteConfig = getBaseViteConfig(config, configFolder, {
      mode: "development",
      server: {
        port: config.serve.port,
        open: config.serve.open,
      },
    });
    const server = await createServer(viteConfig);
    await server.listen();
  } catch (e) {
    console.log(e);
  }
};

export default bundler;
