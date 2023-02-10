import debug from "./debug.js";
import path from "path";
import merge from "lodash.merge";
import loadConfig from "./load-config.js";
import boxen from "boxen";

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
  if (params.theme) {
    config.addons.theme.defaultState = params.theme;
    delete params.theme;
  }
  if (params.addons || params.defaultStory || params.storyOrder) {
    console.log(
      boxen(
        `These settings are not supported through the programatic API:

  - addons, 
  - defaultStory
  - storyOrder

Add them to .ladle/config.mjs instead.`,
        {
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "red",
          titleAlignment: "left",
          textAlignment: "left",
        },
      ),
    );
    process.exit(1);
  }
  merge(config, params);
  debug(`Final config:\n${JSON.stringify(config, null, "  ")}`);
  process.env["VITE_PUBLIC_LADLE_THEME"] = config.addons.theme.defaultState;
  process.env["VITE_PUBLIC_STORIES"] = config.stories;
  return { configFolder, config };
}
