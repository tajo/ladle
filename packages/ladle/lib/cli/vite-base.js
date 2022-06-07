import { dirname, isAbsolute, join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import ladlePlugin from "./vite-plugin/vite-plugin.js";
import { flowPlugin, esbuildFlowPlugin } from "./strip-flow.js";
import mergeViteConfigs from "./merge-vite-configs.js";
import getUserViteConfig from "./get-user-vite-config.cjs";

/**
 * @param publicDir {string | false}
 */
const getPublicDir = (publicDir) => {
  if (!publicDir) {
    return false;
  }
  if (isAbsolute(publicDir)) {
    return publicDir;
  }
  return join(process.cwd(), publicDir || "public");
};

/**
 * @param cacheDir {string | undefined}
 */
const getCacheDir = (cacheDir) => {
  if (!cacheDir) {
    return join(process.cwd(), "node_modules/.vite");
  }
  if (isAbsolute(cachedDir)) {
    return cacheDir;
  }
  return join(process.cwd(), cacheDir);
};

/**
 * @param ladleConfig {import("../shared/types").Config}
 * @param configFolder {string}
 * @param viteConfig {import('vite').InlineConfig}
 */
const getBaseViteConfig = async (ladleConfig, configFolder, viteConfig) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // We need to fake react-dom/client import in case user still uses React v17
  // and not v18, otherwise Vite would fail the import analysis step
  const reactAlias = {};
  try {
    await import("react-dom/client");
  } catch (e) {
    reactAlias["react-dom/client"] = "react-dom";
  }

  const userViteConfig = getUserViteConfig().default;
  if (userViteConfig.publicDir) {
    userViteConfig.publicDir = getPublicDir(userViteConfig.publicDir);
  }
  if (userViteConfig.cacheDir) {
    userViteConfig.cacheDir = getCacheDir(userViteConfig.cacheDir);
  }

  console.log(userViteConfig);

  /**
   * @type {import('vite').InlineConfig}
   */
  const config = {
    ...viteConfig,
    configFile: false,
    root: join(__dirname, "../app/"),
    css: {
      postcss: process.cwd(),
    },
    envDir: process.cwd(),
    resolve: {
      alias: {
        ...reactAlias,
      },
    },
    optimizeDeps: {
      ...(ladleConfig.enableFlow
        ? {
            esbuildOptions: {
              plugins: [esbuildFlowPlugin()],
            },
          }
        : {}),
      include: [
        "react",
        "react-dom",
        "classnames",
        "debug",
        "history",
        "lodash.merge",
        "lodash.merge",
        "lodash.merge",
        "query-string",
        "prism-react-renderer",
        "prism-react-renderer/themes/github",
        "prism-react-renderer/themes/nightOwl",
        "axe-core",
        ...(Object.keys(reactAlias).length ? [] : ["react-dom/client"]),
      ],
      entries: [
        path.join(process.cwd(), ".ladle/components.js"),
        path.join(process.cwd(), ".ladle/components.jsx"),
        path.join(process.cwd(), ".ladle/components.tsx"),
        path.join(process.cwd(), ".ladle/components.ts"),
      ],
    },
    plugins: [
      tsconfigPaths({
        root: process.cwd(),
      }),
      ...(ladleConfig.enableFlow ? [flowPlugin()] : []),
      ladlePlugin(ladleConfig, configFolder, viteConfig.mode || ""),
      react(),
    ],
    ...(ladleConfig.enableFlow
      ? {
          esbuild: {
            include: /\.(tsx?|jsx?)$/,
            exclude: [],
            loader: "tsx",
          },
        }
      : {}),
  };
  return mergeViteConfigs(userViteConfig, config);
};

export default getBaseViteConfig;
