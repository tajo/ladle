/* eslint-disable @typescript-eslint/no-require-imports */
// Learn more https://docs.expo.io/guides/customizing-metro
const { mergeConfig } = require("@react-native/metro-config");

const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, "node_modules"),
      path.resolve(workspaceRoot, "node_modules"),
    ],
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
  },
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  },
};

module.exports = mergeConfig(defaultConfig, config);
