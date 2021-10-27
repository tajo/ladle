import template from "@babel/template";
import generate from "@babel/generator";
import t from "@babel/types";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @param entryData {import('../../../shared/types').EntryData}
 */
const getStoryImports = (entryData) => {
  let storyImports = `import { lazy, createElement, Fragment } from "react";\n`;
  const lazyImport = template.default(`
    const %%component%% = lazy(() =>
     import(%%source%%).then((module) => {
        return { default: module.%%story%% };
      })
    );
  `);

  Object.keys(entryData).forEach((entry) => {
    entryData[entry].stories.forEach(({ componentName, namedExport }) => {
      const ast = lazyImport({
        source: t.stringLiteral(
          path.relative(
            path.join(__dirname, "../../../app/src"),
            path.join(process.cwd(), entry),
          ),
        ),
        component: t.identifier(componentName),
        story: t.identifier(namedExport),
      });
      storyImports += `\n${generate.default(/** @type {any} */ (ast)).code}`;
    });
  });

  return storyImports;
};

export default getStoryImports;
