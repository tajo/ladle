import { createServer } from "vite";
import express from "express";
import getPort from "get-port";
import globby from "globby";
import open from "open";
import debug from "./debug.js";
import getBaseViteConfig from "./vite-base.js";
import { getMetaJsonObject } from "./vite-plugin/generate/get-meta-json.js";
import { getEntryData } from "./vite-plugin/parse/get-entry-data.js";

/**
 * @param config {import("../shared/types").Config}
 * @param configFolder {string}
 */
const bundler = async (config, configFolder) => {
  const app = express();
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
      define: {
        __DEV__: true,
      },
      server: {
        port: config.serve.port,
        open: config.serve.open,
        middlewareMode: "html",
      },
    });
    const vite = await createServer(viteConfig);
    app.get("/meta.json", async (_, res) => {
      const entryData = await getEntryData(await globby([config.stories]));
      const jsonContent = getMetaJsonObject(entryData);
      res.json(jsonContent);
    });
    app.use(vite.middlewares);
    app.listen(port, async () => {
      console.log("");
      console.log("****************************************************");
      console.log("");
      console.log(`      Ladle served at http://localhost:${port}`);
      console.log("");
      console.log("****************************************************");
      console.log("");
      if (config.serve.open !== "none") {
        await open(
          `http://localhost:${port}`,
          ["chrome", "firefox", "edge", "safari"].includes(config.serve.open)
            ? { app: { name: config.serve.open } }
            : {},
        );
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export default bundler;
