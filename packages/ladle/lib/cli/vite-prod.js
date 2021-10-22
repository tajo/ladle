import { build } from "vite";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import ladlePlugin from "./vite-plugin/vite-plugin.js";

/**
 * @param config {import("../shared/types").Config}
 * @param configFolder {string}
 */
const viteProd = async (config, configFolder) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  try {
    /**
     * @type {import('vite').InlineConfig}
     */
    const viteConfig = {
      configFile: false,
      root: join(__dirname, "../app/"),
      base: config.build.baseUrl,
      mode: "production",
      build: {
        outDir: join(process.cwd(), config.build.out),
        sourcemap: config.build.sourcemap,
      },
      plugins: [ladlePlugin(config), react()],
      esbuild: {
        include: /\.(tsx?|jsx?)$/,
        exclude: [],
        loader: "tsx",
      },
    };
    await build(viteConfig);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};

export default viteProd;
