const template = require("@babel/template").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

/**
 * @param entryData {import('../../../shared/types').EntryData}
 */
const getStoryImports = (entryData) => {
  // TODO: Is there a better way to get Snowpack to resolve this import for us?
  const reactManifestLoc = require.resolve('react/package.json', {paths: [process.cwd()]});
  const reactVersion = require(reactManifestLoc).version;
  let storyImports = `import * as React from "./_snowpack/pkg/react.v${reactVersion}.js";\n`;
  const lazyImport = template(`
    const %%component%% = React.lazy(() =>
     import(%%source%%).then((module) => {
        return { default: module.%%story%% };
      })
    );
  `);

  Object.keys(entryData).forEach((entry) => {
    entryData[entry].stories.forEach(({ componentName, namedExport }) => {
      const ast = lazyImport({
        source: t.stringLiteral(`./${entry}`.replace(/\.tsx?$/, ".js")),
        component: t.identifier(componentName),
        story: t.identifier(namedExport),
      });
      storyImports += `\n${generate(/** @type {any} */ (ast)).code}`;
    });
  });

  return storyImports;
};

module.exports = getStoryImports;
