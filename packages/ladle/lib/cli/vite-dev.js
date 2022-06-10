import { createServer } from "vite";
import express from "express";
import getPort from "get-port";
import globby from "globby";
import boxen from "boxen";
import chokidar from "chokidar";
import openBrowser from "./open-browser.js";
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
    port: [config.port, 61001, 62002, 62003, 62004, 62005],
  });
  debug(`Port set to: ${port}`);
  try {
    /**
     * @type {import('vite').InlineConfig}
     */
    const viteConfig = await getBaseViteConfig(config, configFolder, {
      mode: "development",
      server: {
        port: config.port,
        fs: {
          strict: false,
        },
        middlewareMode: "html",
      },
    });
    const vite = await createServer(viteConfig);
    const { moduleGraph, ws } = vite;
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

      if (vite.config.server.open !== "none") {
        const browser = /** @type {string} */ (vite.config.server.open);
        await openBrowser(`http://localhost:${port}`, browser);
      }
    });

    // trigger full reload when new stories are added or removed
    const watcher = chokidar.watch(config.stories, {
      persistent: true,
    });
    let checkSum = "";
    const getChecksum = async () => {
      try {
        const entryData = await getEntryData(await globby([config.stories]));
        const jsonContent = getMetaJsonObject(entryData);
        // loc changes should not grant a full reload
        Object.keys(jsonContent.stories).forEach((storyId) => {
          jsonContent.stories[storyId].locStart = 0;
          jsonContent.stories[storyId].locEnd = 0;
        });
        return JSON.stringify(jsonContent);
      } catch (e) {
        return checkSum;
      }
    };
    checkSum = await getChecksum();
    const invalidate = async () => {
      const newChecksum = await getChecksum();
      if (checkSum === newChecksum) return;
      checkSum = newChecksum;
      const module = moduleGraph.getModuleById("\0virtual:generated-list");
      if (module) {
        moduleGraph.invalidateModule(module);
        if (ws) {
          ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      }
    };
    watcher
      .on("add", invalidate)
      .on("change", invalidate)
      .on("unlink", invalidate);
  } catch (e) {
    console.log(e);
  }
};

export default bundler;
