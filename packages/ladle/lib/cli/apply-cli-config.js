import debug from "./debug.js";
import path from "path";
import merge from "lodash.merge";
import loadConfig from "./load-config.js";

/**
 * @param params {import("../shared/types").CLIParams}
 */
export default async function applyCLIConfig(params) {
  debug(`CLI theme: ${params.theme}`);
  debug(`CLI stories: ${params.stories}`);
  debug(`CLI host: ${params.host || "undefined"}`);
  debug(`CLI port: ${params.port || "undefined"}`);
  debug(`CLI out: ${params.outDir || "undefined"}`);
  params.config = params.config || ".ladle";
  const configFolder = path.isAbsolute(params.config)
    ? params.config
    : path.join(process.cwd(), params.config);
  const config = await loadConfig(configFolder);
  if (params.theme) {
    config.addons.theme.defaultState = params.theme;
    delete params.theme;
  }
  merge(config, params);
  debug(`Final config:\n${JSON.stringify(config, null, "  ")}`);
  process.env["VITE_PUBLIC_LADLE_THEME"] = config.addons.theme.defaultState;
  return { configFolder, config };
}
