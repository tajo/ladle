import path from "path";
import merge from "lodash.merge";
import { storyGlob } from "./const.js";
import debug from "./debug.js";

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
    if (Object.keys(config).length === 0) {
      debug("Custom config is empty.");
    } else {
      debug(`Custom config found: ${JSON.stringify(config)}`);
    }
    return merge(defaultConfig, config);
  } catch (e) {
    debug(`No custom config found.`);
    return defaultConfig;
  }
};

export default loadConfig;
