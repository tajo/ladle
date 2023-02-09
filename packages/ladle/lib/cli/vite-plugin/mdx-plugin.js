// @ts-nocheck
import { SourceMapGenerator } from "source-map";
import { VFile } from "vfile";
import { transformAsync } from "@babel/core";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { createFormatAwareProcessors } from "@mdx-js/mdx/lib/util/create-format-aware-processors.js";
import mdxToStories from "./mdx-to-stories.js";

/**
 * @param {string} code
 * @return {string}
 */
const unknownBackticks = (code) => {
  const lines = code.split("\n");
  const newLines = [...lines];
  let hits = 0;
  let knownBlock = false;
  lines.forEach((line, lineNumber) => {
    if (line.startsWith("```") && line.length > 3) {
      knownBlock = true;
      return;
    }
    if (line === "```") {
      if (knownBlock) {
        knownBlock = false;
        return;
      }
      hits++;
      if (hits & 1) {
        newLines[lineNumber] = "```unknown";
      }
    }
  });
  return newLines.join("\n");
};

/**
 * @param {any} opts
 * @return {any}
 */
function mdxPlugin(opts) {
  /** @type any */
  let reactPluginTransform;
  const { process } = createFormatAwareProcessors({
    SourceMapGenerator,
    development: opts.mode === "development",
    providerImportSource: "@mdx-js/react",
    jsx: true,
    remarkPlugins: [remarkGfm],
  });

  const markdownProcessor = createFormatAwareProcessors({
    format: "md",
    providerImportSource: "@mdx-js/react",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeRaw],
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
      if (path.endsWith(".md") || path.endsWith(".mdx")) {
        value = unknownBackticks(value);
        console.log(value);
      }
      const file = new VFile({ value, path });
      if (path.endsWith(".md")) {
        const compiled = await markdownProcessor.process(file);
        return { code: String(compiled.value), map: compiled.map };
      }
      if (path.endsWith(".mdx")) {
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
