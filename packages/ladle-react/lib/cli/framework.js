import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import t from "@babel/types";

// improve the import path
import {
  defineFrameworkConfig,
  generate,
  template,
  cleanupWindowsPath,
  IMPORT_ROOT,
} from "@ladle/core/framework";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const libDir = path.join(__dirname, "..");

export const define = () =>
  defineFrameworkConfig({
    name: "react",
    base: libDir,
    vite: {
      app: path.join(libDir, "app"),
      config: async (userViteConfig, cliDefaultConfig) => {
        // original code: /cli/get-user-vite-config.js
        // detect if user's config has react and TS Config plugins
        // so we can't avoid adding them through our defaults again
        const hasReactPlugin = userViteConfig.plugins
          ? userViteConfig.plugins.some((plugin) => {
              return Array.isArray(plugin)
                ? plugin.some(
                    (item) =>
                      //@ts-ignore
                      item && item.name && item.name.includes("vite:react-"),
                  )
                : //@ts-ignore
                  plugin && plugin.name && plugin.name.includes("vite:react-");
            })
          : false;

        // original code: /cli/vite-base.js
        // We need to fake react-dom/client import if the user still uses React v17
        // and not v18, otherwise Vite would fail the import analysis step
        const resolve = {};
        try {
          await import("react-dom/client");
        } catch (e) {
          // If the user already has custom `resolve.alias` configured, we must match
          // the same format. This logic is heavily inspired from:
          // https://github.com/rollup/plugins/blob/985cf4c422896ac2b21279f0f99db9d281ef73c2/packages/alias/src/index.ts#L19-L34

          if (Array.isArray(userViteConfig.resolve?.alias)) {
            resolve.alias = [
              {
                find: "react-dom/client",
                replacement: "react-dom",
              },
            ];
          } else {
            resolve.alias = {
              "react-dom/client": "react-dom",
            };
          }
        }

        // original code: /cli/vite-base.js
        cliDefaultConfig.resolve = resolve;
        // this array is always non-empty, optional operator is not needed
        cliDefaultConfig.optimizeDeps?.include?.push(
          "history",
          "@ladle/react-context",
          "react",
          "react-dom",
          "react-inspector",
          "prism-react-renderer",
          "prism-react-renderer/themes/github",
          "prism-react-renderer/themes/nightOwl",
          "react-frame-component",
          "@mdx-js/react",
          ...(!!resolve.alias ? [] : ["react-dom/client"]),
        );
        cliDefaultConfig.logLevel = "info";

        if (!hasReactPlugin) {
          cliDefaultConfig.plugins?.push(react());
        }
        return cliDefaultConfig;
      },
    },

    transformer: {
      hmrPath: path.join(libDir, "app/src/story-hmr"),

      // original code: /cli/vite-plugin/vite-plugin.js
      // if stories are defined through .bind({}) we need to force full reloads since
      // react-refresh can't pick it up
      extraCode: (code) =>
        code.includes(".bind({})")
          ? `if (import.meta.hot) {
          import.meta.hot.on("vite:beforeUpdate", () => {
            import.meta.hot.invalidate();
          });
        }`
          : "",
    },

    generator: {
      // original code: /cli/vite-plugin/vite-plugin.js
      defaultListModule: (errorMessage) =>
        `
import { lazy } from "react";
import * as React from "react";
export const list = [];
export const config = {};
export const stories = {};
export const storySource = {};
export const errorMessage = \`${errorMessage}\`;
export const Provider = ({ children }) =>
  /*#__PURE__*/ React.createElement(React.Fragment, null, children);
`,
      getStoryImports: (entryData) => {
        let storyImports = `import { lazy, createElement, Fragment } from "react";\n`;
        storyImports += `import composeEnhancers from "/src/compose-enhancers";\n`;
        const lazyImport = template(`
    const %%component%% = lazy(() =>
     import(%%source%%).then((module) => {
        return { default: composeEnhancers(module, %%story%%) };
      })
    );
  `);

        Object.keys(entryData).forEach((entry) => {
          entryData[entry].stories.forEach(({ componentName, namedExport }) => {
            const ast = lazyImport({
              source: t.stringLiteral(
                cleanupWindowsPath(path.join(IMPORT_ROOT, entry)),
              ),
              component: t.identifier(componentName),
              story: t.stringLiteral(namedExport),
            });
            storyImports += `\n${generate(ast).code}`;
          });
        });

        return storyImports;
      },
      noopProvider: `export const Provider = ({children}) => /*#__PURE__*/createElement(Fragment, null, children);\n`,
    },

    mdx: {
      packageName: "@ladle/react",
      mdOptions: {
        providerImportSource: "@ladle/react",
      },
      mdxOptions: {
        providerImportSource: "@ladle/react",
      },
      compileOptions: {
        providerImportSource: "@mdx-js/react",
      },
      transformPluginName: "vite:react-babel",
    },
  });
