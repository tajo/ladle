// originated here: https://github.com/mdx-js/mdx/blob/main/packages/rollup/lib/index.js
import { SourceMapGenerator } from "source-map";
import { VFile } from "vfile";
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
      if (file.extname && extnames.includes(file.extname)) {
        const compiled = await process(file);
        console.log(String(compiled.value));
        console.log(path);
        console.log("------");
        // stories files needs to go through named export transform
        const code = path.endsWith(".stories.mdx")
          ? await mdxToStories(String(compiled.value), path)
          : String(compiled.value);
        console.log("******");
        console.log(code);
        return { code, map: compiled.map };
      }
    },
  };
}

export default mdxPlugin;
