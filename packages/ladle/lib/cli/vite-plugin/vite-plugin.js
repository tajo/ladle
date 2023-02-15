import { globby } from "globby";
import path from "path";
import fs from "fs";
import debugFactory from "debug";
import getAppRoot from "../get-app-root.js";
import getGeneratedList from "./generate/get-generated-list.js";
import { getEntryData } from "./parse/get-entry-data.js";
import { detectDuplicateStoryNames, printError } from "./utils.js";
import cleanupWindowsPath from "./generate/cleanup-windows-path.js";

const debug = debugFactory("ladle:vite");

/**
 * @param errorMessage {string}
 */
const defaultListModule = (errorMessage) => `
import { lazy } from "react";
import * as React from "react";
export const list = [];
export const config = {};
export const stories = {};
export const storySource = {};
export const errorMessage = \`${errorMessage}\`;
export const Provider = ({ children }) =>
  /*#__PURE__*/ React.createElement(React.Fragment, null, children);
`;

/**
 * @param config {import("../../shared/types").Config}
 * @param configFolder {string}
 * @param mode {string}
 */
function ladlePlugin(config, configFolder, mode) {
  const virtualModuleId = "virtual:generated-list";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;
  const headHtmlPath = path.join(configFolder, "head.html");
  return {
    name: "ladle:core",
    /**
     * @param {string} id
     */
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
      return null;
    },
    transformIndexHtml: {
      /**
       * @param {string} html
       * @param {any} ctx
       */
      transform(html, ctx) {
        if (ctx.path === "/index.html") {
          if (fs.existsSync(headHtmlPath)) {
            const headHtml = fs.readFileSync(headHtmlPath, "utf8");
            html = html.replace("</head>", `${headHtml}</head>`);
          }
          if (config.appendToHead !== "") {
            html = html.replace("</head>", `${config.appendToHead}</head>`);
          }
        }
        return html;
      },
    },
    /**
     * @param {string} code
     * @param {string} id
     */
    async transform(code, id) {
      // We instrument stories with a simple eventemitter like code so
      // some addons (like a11y) can subscribe to changes and re-run
      // on HMR updates
      if (id.includes(".stories.")) {
        const from = cleanupWindowsPath(
          path.join(getAppRoot(), "src/story-hmr"),
        );
        const watcherImport = `import { storyUpdated } from "${from}";`;
        // if stories are defined through .bind({}) we need to force full reloads since
        // react-refresh can't pick it up
        const invalidateHmr = code.includes(".bind({})")
          ? `if (import.meta.hot) {
          import.meta.hot.on("vite:beforeUpdate", () => {
            import.meta.hot.invalidate();
          });
        }`
          : "";
        // make sure the `loaded` attr is set even if the story is loaded through iframe
        const setLoadedAttr = `typeof window !== 'undefined' &&
          window.document &&
          window.document.createElement && document.documentElement.setAttribute("data-storyloaded", "");`;
        return {
          code: `${code}\n${setLoadedAttr}\n${invalidateHmr}\n${watcherImport}\nif (import.meta.hot) {
          import.meta.hot.accept(() => {
            storyUpdated();
          });
        }`,
          map: null,
        };
      }
      return { code, map: null };
    },
    /**
     * @param {string} id
     */
    async load(id) {
      if (id === resolvedVirtualModuleId) {
        debug(`transforming: ${id}`);
        try {
          debug("Initial generation of the list");
          const entryData = await getEntryData(
            await globby(
              Array.isArray(config.stories) ? config.stories : [config.stories],
            ),
          );
          detectDuplicateStoryNames(entryData);
          return await getGeneratedList(entryData, configFolder, config);
        } catch (/** @type {any} */ e) {
          printError("\nStory discovering failed:\n");
          printError(e);
          printError("\nMore info: https://ladle.dev/docs/stories#limitations");
          if (mode === "production") {
            process.exit(1);
          }
          return /** @type {string} */ (defaultListModule(e.message));
        }
      }
      return;
    },
  };
}

export default ladlePlugin;
