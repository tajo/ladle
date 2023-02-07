// originated here: https://github.com/mdx-js/mdx/blob/main/packages/rollup/lib/index.js
import { SourceMapGenerator } from "source-map";
import { VFile } from "vfile";
import { transformAsync } from "@babel/core";
import { createFormatAwareProcessors } from "@mdx-js/mdx/lib/util/create-format-aware-processors.js";
import mdxToStories from "./mdx-to-stories.js";

/**
 * Compile MDX w/ rollup.
 *
 * @param {Options} [options]
 * @return {Plugin}
 */
function mdxPlugin() {
  /** @type Plugin['transform'] | undefined */
  let reactPluginTransform;
  const { extnames, process } = createFormatAwareProcessors({
    SourceMapGenerator,
    // preserve JSX for our AST transform into component story format (CSF)
    jsx: true,
  });

  return {
    name: "ladle:stories-mdx",
    enforce: "pre",
    configResolved: ({ plugins }) => {
      reactPluginTransform = plugins.find(
        (p) =>
          p.name === "vite:react-babel" && typeof p.transform === "function",
      )?.transform;
      if (!reactPluginTransform) {
        throw new Error(
          `Can't find an instance of @vitejs/plugin-react. You should apply this plugin to make mdx work.`,
        );
      }
    },
    async transform(value, path) {
      const [filepath, querystring = ""] = path.split("?");
      const file = new VFile({ value, path });
      if (file.extname && extnames.includes(file.extname)) {
        const compiled = await process(file);
        let code = String(compiled.value);
        if (filepath.endsWith(".stories.mdx")) {
          // AST transform from MDX compiler output into CSF
          code = await mdxToStories(String(compiled.value), filepath);
        }

        return await reactPluginTransform(
          // compile JSX away since we skip this part in MDX compiler
          (
            await transformAsync(code, {
              plugins: [
                [
                  "@babel/plugin-transform-react-jsx",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            })
          ).code,
          // trick vitejs/plugin-react into adding HMR/fast-refresh
          `${filepath}${querystring ? "&ext=.jsx" : "?ext=.jsx"}`,
        );
      }
    },
  };
}

export default mdxPlugin;
