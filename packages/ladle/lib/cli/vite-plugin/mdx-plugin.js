// @ts-nocheck
import { SourceMapGenerator } from "source-map";
import { transformWithEsbuild } from "vite";
import { VFile } from "vfile";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeAddClasses from "rehype-class-names";
import { createFormatAwareProcessors } from "@mdx-js/mdx/internal-create-format-aware-processors";
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
  let usesReactPluginSwc;
  const isDev = opts.mode === "development";
  const { process } = createFormatAwareProcessors({
    SourceMapGenerator,
    development: isDev,
    providerImportSource: "@ladle/react",
    jsx: true,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypeAddClasses, { "*": "ladle-markdown" }]],
  });

  const markdownProcessor = createFormatAwareProcessors({
    format: "md",
    providerImportSource: "@ladle/react",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeRaw, [rehypeAddClasses, { "*": "ladle-markdown" }]],
  });

  return {
    name: "ladle:stories-mdx",
    enforce: "pre",
    configResolved: ({ plugins }) => {
      reactPluginTransform = plugins.find(
        (p) =>
          p.name === "vite:react-babel" && typeof p.transform === "function",
      )?.transform;
      usesReactPluginSwc = plugins.some((p) => p.name === "vite:react-swc");
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

        // in prod mode, we don't need any JSX-dev transforms
        // just using esbuild to compile JSX away
        if (!isDev) {
          return (
            await transformWithEsbuild(code, filepath.replace(".mdx", ".jsx"), {
              jsx: "automatic",
            })
          ).code;
        }

        // trick esbuild and vitejs/plugin-react into compiling it as jsx
        const filename = `${filepath}${
          querystring ? "&ext=.jsx" : "?ext=.jsx"
        }`;
        if (!usesReactPluginSwc && !reactPluginTransform) {
          throw new Error(
            `You need to install and use @vitejs/plugin-react-swc or @vitejs/plugin-react so ${filename} can be compiled.`,
          );
        }
        if (reactPluginTransform) {
          return await reactPluginTransform(
            (await transformWithEsbuild(code, filename)).code,
            filepath.replace(".mdx", ".jsx"),
          );
        }
        return { code, map: compiled.map };
      }
    },
  };
}

export default mdxPlugin;
