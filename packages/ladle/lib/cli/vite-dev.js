import { createServer } from "vite";
import getPort from "get-port";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import ladlePlugin from "./vite-plugin/vite-plugin.js";
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
  const __dirname = dirname(fileURLToPath(import.meta.url));
  try {
    /**
     * @type {import('vite').InlineConfig}
     */
    const viteConfig = {
      configFile: false,
      root: join(__dirname, "../app/"),
      base: "/",
      mode: "development",
      plugins: [ladlePlugin(config), react()],
      server: {
        port: config.serve.port,
        open: config.serve.open,
      },
      esbuild: {
        include: /\.(tsx?|jsx?)$/,
        exclude: [],
        loader: "tsx",
      },
    };
    const server = await createServer(viteConfig);
    await server.listen();
  } catch (e) {
    console.log(e);
  }
};

export default bundler;
