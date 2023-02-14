// @ts-nocheck
import { SourceMapGenerator } from "source-map";
import { transformWithEsbuild } from "vite";
import { VFile } from "vfile";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { createFormatAwareProcessors } from "@mdx-js/mdx/lib/util/create-format-aware-processors.js";
import mdxToStories from "./mdx-to-stories.js";
import { getFrameworkConfig } from "../framework.js";

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
 * @return {import('vite').Plugin}
 */
function mdxPlugin(opts) {
  const frameworkConfig = getFrameworkConfig();

  /** @type {import('vite').Plugin['transform']} */
  let pluginTransform;
  const { process } = createFormatAwareProcessors({
    SourceMapGenerator,
    development: opts.mode === "development",
    jsx: true,
    remarkPlugins: [remarkGfm],
    ...frameworkConfig.mdx.mdxOptions,
  });

  const markdownProcessor = createFormatAwareProcessors({
    format: "md",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeRaw],
    ...frameworkConfig.mdx.mdOptions,
  });

  return {
    name: "ladle:stories-mdx",
    enforce: "pre",
    configResolved: ({ plugins }) => {
      pluginTransform = plugins.find(
        (p) =>
          p.name === frameworkConfig.mdx.transformPluginName &&
          typeof p.transform === "function",
      )?.transform;
      if (!pluginTransform) {
        throw new Error(
          `Can't find an instance of ${frameworkConfig.mdx.transformPluginName}. You should apply this plugin to make mdx work.`,
        );
      }
    },
    async transform(value, path) {
      const [filepath, querystring = ""] = path.split("?");
      if (path.endsWith(".md") || path.endsWith(".mdx")) {
        value = unknownBackticks(value);
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
        // trick esbuild and vitejs/plugin-react into compiling it as jsx
        const filename = `${filepath}${
          querystring ? "&ext=.jsx" : "?ext=.jsx"
        }`;
        return pluginTransform(
          (await transformWithEsbuild(code, filename)).code,
          filename,
        );
      }
    },
  };
}

export default mdxPlugin;
