import debug from "./debug.js";
import path from "path";
import loadConfig from "./load-config.js";

/**
 * @param params {import("../shared/types").CLIParams}
 */
export default async function applyCLIConfig(params) {
  debug(`CLI theme: ${params.theme}`);
  debug(`CLI stories: ${params.stories}`);
  debug(`CLI port: ${params.port || "undefined"}`);
  debug(`CLI out: ${params.outDir || "undefined"}`);
  params.config = params.config || ".ladle";
  const configFolder = path.isAbsolute(params.config)
    ? params.config
    : path.join(process.cwd(), params.config);
  const config = await loadConfig(configFolder);
  config.addons.theme.defaultState =
    params.theme || config.addons.theme.defaultState;
  config.stories = params.stories || config.stories;
  config.viteConfig = params.viteConfig || config.viteConfig;
  config.outDir = params.outDir || config.outDir;
  config.port = params.port || config.port;
  config.previewPort = params.previewPort || config.previewPort;
  config.base = params.base || config.base;
  config.mode = params.mode || config.mode;
  config.appendToHead = params.appendToHead || "";
  debug(`Final config:\n${JSON.stringify(config, null, "  ")}`);
  process.env["VITE_PUBLIC_LADLE_THEME"] = config.addons.theme.defaultState;
  process.env["VITE_PUBLIC_STORIES"] = config.stories;
  return { configFolder, config };
}
