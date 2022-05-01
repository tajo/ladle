import { createServer } from "vite";
import express from "express";
import getPort from "get-port";
import globby from "globby";
import boxen from "boxen";
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
    const viteConfig = await getBaseViteConfig(config, configFolder, {
      mode: "development",
      define: config.serve.define,
      server: {
        host: config.serve.host,
        port: config.serve.port,
        open: config.serve.open,
        fs: {
          strict: false,
        },
        middlewareMode: "html",
      },
    });
    const vite = await createServer(viteConfig);
    app.head("*", async (_, res) => res.sendStatus(200));
    app.get("/meta.json", async (_, res) => {
      const entryData = await getEntryData(await globby([config.stories]));
      const jsonContent = getMetaJsonObject(entryData);
      res.json(jsonContent);
    });
    app.use(vite.middlewares);
    app.listen(port, async () => {
      console.log(
        boxen(`🥄 Ladle.dev served at http://localhost:${port}`, {
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "yellow",
          titleAlignment: "center",
          textAlignment: "center",
        }),
      );

      if (config.serve.open !== "none") {
        await open(
          `http://${config.serve.host || 'localhost'}:${port}`,
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
