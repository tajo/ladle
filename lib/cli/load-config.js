import path from "path";
import merge from "lodash.merge";
import { storyGlob } from "./const.js";

/**
 * @type {import('./types').ConfigT}
 */
const defaultConfig = {
  stories: storyGlob,
  theme: "light",
  serve: {
    open: "**Default**",
    port: 61000,
    output: "dashboard",
  },
  build: {
    out: path.join(process.cwd(), "build"),
    sourcemap: false,
    baseUrl: "/",
    optimize: false,
  },
};

const loadConfig = async () => {
  try {
    /**
     * @type {import('./types').ConfigT}
     */
    const config = (
      await import(path.join(process.cwd(), "./.ladle/config.mjs"))
    ).default;
    return merge(defaultConfig, config);
  } catch (e) {
    return defaultConfig;
  }
};

export default loadConfig;
