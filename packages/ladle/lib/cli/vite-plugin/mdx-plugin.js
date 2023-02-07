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
  const { extnames, process } = createFormatAwareProcessors({
    SourceMapGenerator,
    jsx: true,
  });

  console.log(extnames);

  return {
    name: "custom-mdx-js-plugin",
    enforce: "pre",
    async transform(value, path) {
      const file = new VFile({ value, path });
      console.log(file.extname);
      if (file.extname && extnames.includes(file.extname)) {
        console.log("****compiling ", path);

        const compiled = await process(file);
        // console.log(String(compiled.value));
        // console.log(path);
        // console.log("------");
        // stories files needs to go through named export transform

        let code = String(compiled.value);
        if (path.endsWith(".stories.mdx")) {
          code = await mdxToStories(String(compiled.value), path);
        }
        return await transformAsync(code, {
          plugins: [
            [
              "@babel/plugin-transform-react-jsx",
              {
                runtime: "automatic", // defaults to classic
              },
            ],
          ],
        });
      }
    },
  };
}

export default mdxPlugin;
