const template = require("@babel/template").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const path = require("path");

/**
 * @param entryData {import('../../../shared/types').EntryData}
 */
const getStoryImports = (entryData) => {
  let storyImports = `import { lazy, createElement, Fragment } from "react";\n`;
  const lazyImport = template(`
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
      storyImports += `\n${generate(/** @type {any} */ (ast)).code}`;
    });
  });

  return storyImports;
};

module.exports = getStoryImports;
