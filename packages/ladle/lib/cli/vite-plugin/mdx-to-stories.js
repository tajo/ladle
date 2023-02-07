import { transformFromAstAsync } from "@babel/core";
import { compile } from "@mdx-js/mdx";
import getAst from "./get-ast.js";

const transformPlugin = (babel) => {
  const { types: t } = babel;
  const packageName = "@ladle/react";
  const moduleName = "Story";

  const compareToModuleName = Array.isArray(moduleName)
    ? (s) => moduleName.includes(s)
    : (s) => s === moduleName;

  return {
    name: "ast-transform", // not required
    visitor: {
      ImportDeclaration(path /*: Object */, state /*: Object */) {
        const program = path.findParent((path) => path.isProgram());
        const sourceName = path.get("source").node.value;
        if (
          (Array.isArray(packageName) &&
            packageName.indexOf(sourceName) === -1) ||
          (typeof packageName === "string" && sourceName !== packageName)
        ) {
          return;
        }
        state.importedPackageName = sourceName;
        path.get("specifiers").forEach((specifier) => {
          const localPath = specifier.get("local");
          const localName = localPath.node.name;
          if (!localPath.scope.bindings[localName]) {
            return;
          }
          const refPaths = localPath.scope.bindings[localName].referencePaths;
          if (t.isImportSpecifier(specifier)) {
            // import {moduleName} from 'packageName';
            const specifierName = specifier.get("imported").node.name;
            if (compareToModuleName(specifierName)) {
              refPaths.forEach((refPath, index) => {
                let identifier = `LadleStory${index}`;
                const parentPath = refPath.parentPath;
                if (!t.isJSXOpeningElement(parentPath)) {
                  return;
                }
                const content = refPath.parentPath.container.children;
                program.pushContainer(
                  "body",
                  t.exportNamedDeclaration(
                    t.variableDeclaration("const", [
                      t.variableDeclarator(
                        t.identifier(identifier),
                        t.arrowFunctionExpression(
                          [],
                          t.jsxFragment(
                            t.jsxOpeningFragment(),
                            t.jsxClosingFragment(),
                            content,
                          ),
                        ),
                      ),
                    ]),
                  ),
                );
                refPath.container.attributes.forEach((attr) => {
                  program.pushContainer(
                    "body",
                    t.expressionStatement(
                      t.assignmentExpression(
                        "=",
                        t.memberExpression(
                          t.identifier(identifier),
                          t.identifier(
                            attr.name.name === "name"
                              ? "storyName"
                              : attr.name.name,
                          ),
                        ),
                        attr.value.type === "JSXExpressionContainer"
                          ? attr.value.expression
                          : attr.value,
                      ),
                    ),
                  );
                });
              });
            }
          } else if (t.isImportNamespaceSpecifier(specifier)) {
            // import * as pkg from 'packageName';
            // TODO(#5): Handle this case, or issue a warning because this may not be 100% robust
          }
        });
      },
    },
  };
};

const prepare = async (code, filename, transformMdx = false) => {
  const inputCode = transformMdx
    ? String(await compile(code, { jsx: true }))
    : code;
  const ast = getAst(inputCode, filename);
  const output = await transformFromAstAsync(ast, inputCode, {
    plugins: [transformPlugin],
  });
  return output.code;
};

export default prepare;
