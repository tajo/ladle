import path from "path";
import fs from "fs";
import { createRequire } from "module";
// @ts-ignore
import { fileURLToPath } from "url";
import { createConfiguration } from "snowpack";
const require = createRequire(import.meta.url);

/**
 * @param {string[]} mount
 */
export const getCustomMounts = (mount) => {
  const res = /** @type {{[key: string]: { url: string }}}*/ ({});
  mount.forEach((folder) => {
    res[path.join(process.cwd(), folder)] = { url: `/${folder}` };
  });
  return res;
};

/**
 * @param {string} storyGlob
 */
const getStoryFolder = (storyGlob) => {
  const parts = storyGlob.split("/");
  if (storyGlob === "" || !fs.existsSync(path.join(process.cwd(), parts[0]))) {
    throw Error(
      `Story glob ${storyGlob} must match an existing folder. The ${parts[0]} folder was not found.`,
    );
  }
  return parts[0];
};

const babelPresets = [
  [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
  [
    require.resolve("@babel/preset-env"),
    {
      targets: { esmodules: true },
      bugfixes: true,
      modules: false,
    },
  ],
];

const babelPlugins = [
  require.resolve("@babel/plugin-proposal-class-properties"),
];

/**
 * @param {any} extendConfig
 * @param pluginOptions {import("../shared/types").PluginOptions}
 */
const getSnowpackConfig = async (extendConfig, pluginOptions) => {
  //@ts-ignore
  const configPath = path.join(process.cwd(), "./.ladle/config.mjs");
  const configExists = fs.existsSync(configPath);
  const componentsPath = path.join(process.cwd(), "./.ladle/components.tsx");
  const componentsPathJs = path.join(process.cwd(), "./.ladle/components.js");
  const componentsExists =
    fs.existsSync(componentsPath) || fs.existsSync(componentsPathJs);
  const dirname = fileURLToPath(import.meta.url);
  const storyFolder = getStoryFolder(pluginOptions.storyGlob);
  const bundlerConfig = {
    ...extendConfig,
    packageOptions: {
      knownEntrypoints: ["react/jsx-runtime"],
    },
    mount: {
      [path.join(dirname, "../../app/public/")]: { url: "/", static: true },
      [path.join(dirname, "../../app/src/")]: { url: "/" },
      [path.join(dirname, "../../app/generated/")]: {
        url: "/",
        resolve: false,
      },
      [path.join(dirname, "../../shared/")]: { url: "/" },
      [path.join(process.cwd(), storyFolder)]: { url: `/${storyFolder}` },
      ...(configExists || componentsExists
        ? { [path.join(process.cwd(), ".ladle")]: { url: "/" } }
        : {}),
      ...(extendConfig.mount ? extendConfig.mount : {}),
    },
    plugins: [
      require.resolve("@snowpack/plugin-react-refresh"),
      [
        require.resolve("@snowpack/plugin-babel"),
        {
          input: [".ts", ".tsx"],
          transformOptions: {
            presets: [
              require.resolve("@babel/preset-typescript"),
              ...babelPresets,
              ...extendConfig.babelPresets,
            ],
            plugins: [...babelPlugins, ...extendConfig.babelPlugins],
          },
        },
      ],
      [
        require.resolve("@snowpack/plugin-babel"),
        {
          input: [".js", ".mjs", ".jsx"],
          transformOptions: {
            presets: [
              require.resolve("@babel/preset-flow"),
              ...babelPresets,
              ...extendConfig.babelPresets,
            ],
            plugins: [...babelPlugins, ...extendConfig.babelPlugins],
          },
        },
      ],
      [
        path.join(dirname, "../snowpack-plugin/snowpack-plugin.js"),
        pluginOptions,
      ],
      ...(extendConfig.plugins ? extendConfig.plugins : []),
    ],
  };
  const createdConfig = createConfiguration(bundlerConfig);
  // ignore all node_modules except ladle
  createdConfig.exclude[0] = "**/node_modules/!(@ladle)**/*";
  return createdConfig;
};

export default getSnowpackConfig;
