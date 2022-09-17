import t from "@babel/types";
import path from "path";
import { template, generate } from "../babel.js";

/**
 * @param entryData {import('../../../shared/types').EntryData}
 */
const getStoryImports = (entryData) => {
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
        source: t.stringLiteral(path.join(process.cwd(), entry)),
        component: t.identifier(componentName),
        story: t.stringLiteral(namedExport),
      });
      storyImports += `\n${generate(ast).code}`;
    });
  });

  return storyImports;
};

export default getStoryImports;
