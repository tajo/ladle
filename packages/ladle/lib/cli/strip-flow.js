// @ts-ignore
import flowRemoveTypes from "flow-remove-types";
import { createFilter } from "rollup-pluginutils";
import { readFile } from "fs";

const EXPORT_TYPES = /export\stype\s\*\sfrom\s[a-zA-Z0-9."\/\-_']+;/gm;

/**
 * Create a Vite plugin object
 * @returns {import('@miksu/vite').Plugin} Returns esbuild plugin object
 */
export function flowPlugin(
  options /** {import('../shared/types').VitePluginOptions */ = {
    include: /\.(flow|jsx?)$/,
    exclude: /node_modules/,
    flow: {
      all: false,
      pretty: false,
      ignoreUninitializedFields: false,
    },
  },
) {
  const filter = createFilter(options.include, options.exclude);
  return {
    enforce: "pre",
    name: "flow",
    transform(src, id) {
      // eslint-disable-line consistent-return
      if (filter(id)) {
        const transformed = flowRemoveTypes(src, options.flow);
        return {
          code: transformed.toString().replace(EXPORT_TYPES, ""),
          map: null,
        };
      }
      return undefined;
    },
  };
}

/**
 * Create an esbuild plugin object
 *
 * @returns {import('esbuild').Plugin} Returns esbuild plugin object
 */
export function esbuildFlowPlugin(
  filter = /\.(flow|jsx?)$/,
  flowOptions = {
    all: false,
    pretty: false,
    ignoreUninitializedFields: false,
  },
) {
  return {
    name: "flow",
    setup(build) {
      // @ts-ignore
      build.onLoad({ filter }, async ({ path, namespace }) => {
        try {
          const src = await new Promise((resolve, reject) => {
            readFile(path, (error, data) => {
              if (error) {
                reject(error);
              } else {
                resolve(data.toString("utf-8"));
              }
            });
          });
          const transformed = flowRemoveTypes(src, flowOptions);
          return {
            contents: transformed.toString().replace(EXPORT_TYPES, ""),
            loader: src.includes("@flow\n") ? "jsx" : "js",
          };
        } catch (error) {
          return {
            errors: [
              {
                // @ts-ignore
                text: error.message,
                location: {
                  file: path,
                  namespace,
                },
                detail: error,
              },
            ],
          };
        }
      });
    },
  };
}
