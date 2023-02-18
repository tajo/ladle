import { preview } from "vite";
import boxen from "boxen";
import path from "path";
import getBaseViteConfig from "./vite-base.js";
import openBrowser from "./open-browser.js";

/**
 * @param config {import("../shared/types").Config}
 * @param configFolder {string}
 */
const vitePreview = async (config, configFolder) => {
  try {
    /**
     * @type {import('vite').InlineConfig}
     */
    const viteConfig = await getBaseViteConfig(config, configFolder, {
      mode: config.mode || "production",
      build: {
        outDir: path.join(process.cwd(), config.outDir),
        emptyOutDir: true,
      },
      preview: {
        port: config.previewPort,
      },
    });

    // first check the preview open value
    /** @type {boolean | string | undefined} */
    let openBrowserValue =
      viteConfig.preview && viteConfig.preview.open
        ? viteConfig.preview.open
        : undefined;

    // if not defined, use the server open value
    if (!openBrowserValue && viteConfig.server) {
      openBrowserValue = viteConfig.server.open;
    }

    // never let vite open the preview browser
    // our script is better since it supports pnp
    if (viteConfig.preview) {
      viteConfig.preview.open = false;
    }
    if (viteConfig.server) {
      viteConfig.server.open = false;
    }

    const previewServer = await preview(viteConfig);
    const serverUrl = `${
      previewServer.config.preview.https ? "https" : "http"
    }://${previewServer.config.preview.host || "localhost"}:${
      config.previewPort
    }${config.base ? config.base : ""}`;
    console.log(
      boxen(`🥄 Ladle.dev previewed at ${serverUrl}`, {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "blue",
        titleAlignment: "center",
        textAlignment: "center",
      }),
    );

    if (openBrowserValue !== "none" && openBrowserValue !== false) {
      openBrowser(serverUrl);
    }
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};

export default vitePreview;
