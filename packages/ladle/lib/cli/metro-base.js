/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import importFrom from "import-from";
import path from "path";
import resolveFrom from "resolve-from";
import { getVirtualModuleByName } from "./metro-virtual-mods.js";
import { fileURLToPath } from "url";
import copyMswWorker from "./copy-msw-worker.js";
import { projectPublicDir, appRoot } from "./metro/utils.js";

const projectRoot = process.cwd();
const Metro = importFrom(projectRoot, "metro");
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const entryFilePath = path.join(appRoot, "src/index.tsx");
const { mergeConfig } = importFrom(projectRoot, "@react-native/metro-config");

// App name
export const mainModuleName = "ladle";

export { mergeConfig };

/**
 * @param {number | undefined} [port]
 */
export async function getBaseMetroConfig(port, ladleConfig) {
  process.env["BASE_URL"] = process.env["BASE_URL"] || "/";

  const reactNativePath = resolveFrom(projectRoot, "react-native");
  const userMetroConfig = await Metro.loadConfig();

  if (ladleConfig.addons.msw.enabled) {
    copyMswWorker(projectPublicDir);
  }

  return {
    ...userMetroConfig,
    watchFolders: [
      ...userMetroConfig.watchFolders,
      path.resolve(__dirname, "../app"),
    ],
    server: {
      ...userMetroConfig.server,
      port,
    },
    resolver: {
      ...(userMetroConfig.resolver || {}),
      /**
       * @param {any} context
       * @param {string} moduleName
       * @param {string} platform
       */
      resolveRequest(context, moduleName, platform) {
        const newCtx = { ...context, preferNativePlatform: false };
        // Redirecting '/ladle.bundle' requests to the actual entry file.
        //
        // We have a pseudo bundle name called `ladle.bundle`.
        // It's used for bundling the whole ladle app project.
        // We can not use the ladle app proj path directly because
        // the files live in user's node_modules folder somewhere.
        // Since the position of the installation can vary a lot
        // and not every posible path would be legal to use in the bundle request,
        // the safest option is using a pseudo name and resolving
        // it to the actual file path here.
        if (moduleName === `./${mainModuleName}`) {
          return {
            type: "sourceFile",
            filePath: entryFilePath,
          };
        }

        if (getVirtualModuleByName(moduleName)) {
          return {
            type: "sourceFile",
            filePath: getVirtualModuleByName(moduleName).path,
          };
        }

        // Resolve RNW's asset registry to the RN's official one
        // Required for proper asset resolution.
        if (
          platform === "web" &&
          context.originModulePath.match(
            /node_modules[\\/]react-native-web[\\/]/,
          ) &&
          moduleName.includes("/modules/AssetRegistry")
        ) {
          return {
            type: "sourceFile",
            filePath: path.resolve(
              resolveFrom(
                projectRoot,
                userMetroConfig.transformer.assetRegistryPath ??
                  "@react-native/assets-registry/registry.js",
              ),
            ),
          };
        }

        // Fall back to standard resolution for other modules
        return newCtx.resolveRequest(newCtx, moduleName, platform);
      },
    },
    transformer: {
      ...(userMetroConfig.transformer || {}),
      // Makes Metro use a different asset resolution url format
      publicPath: "/assets/?unstable_path=.",
    },
  };
}
