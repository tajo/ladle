import { build } from "@miksu/vite";
import path from "path";
import getBaseViteConfig from "./vite-base.js";

/**
 * @param config {import("../shared/types").Config}
 * @param configFolder {string}
 */
const viteProd = async (config, configFolder) => {
  try {
    /**
     * @type {import('vite').InlineConfig}
     */
    const viteConfig = getBaseViteConfig(config, configFolder, {
      mode: "production",
      define: {
        __DEV__: false,
      },
      build: {
        outDir: path.join(process.cwd(), config.build.out),
        sourcemap: config.build.sourcemap,
        emptyOutDir: true,
        chunkSizeWarningLimit: 750,
      },
    });
    await build(viteConfig);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};

export default viteProd;
