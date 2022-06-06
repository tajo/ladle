import { build } from "vite";
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
    const viteConfig = await getBaseViteConfig(config, configFolder, {
      mode: "production",
      define: config.build.define,
      build: {
        outDir: path.join(process.cwd(), config.build.out),
        sourcemap: config.build.sourcemap,
        emptyOutDir: true,
        chunkSizeWarningLimit: 1024,
        minify: config.build.minify,
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
