// @ts-nocheck
import { transformFromAstAsync } from "@babel/core";
import { compile } from "@mdx-js/mdx";
import getAst from "./get-ast.js";

const transformPlugin = (babel) => {
  const { types: t } = babel;
  // make it configurable
  const packageName = ["@ladle/react", "@uber/ubook"];

  return {
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
        let metaOccurances = 0;
        path.get("specifiers").forEach((specifier) => {
          const localPath = specifier.get("local");
          const localName = localPath.node.name;
          if (!localPath.scope.bindings[localName]) {
            return;
          }
          const refPaths = localPath.scope.bindings[localName].referencePaths;
          if (t.isImportSpecifier(specifier)) {
            const specifierName = specifier.get("imported").node.name;
            if (specifierName === "Meta") {
              refPaths.forEach((refPath) => {
                const parentPath = refPath.parentPath;
                if (!t.isJSXOpeningElement(parentPath)) {
                  return;
                }
                metaOccurances++;
                if (metaOccurances > 1) {
                  throw new Error(
                    "Only one Meta component can be defined per file",
                  );
                }
                const metaAttributes =
                  refPath.parentPath.container.openingElement.attributes;

                const exportDefaultProps = [];
                let storyName = "Readme";
                metaAttributes.forEach((attr) => {
                  if (attr.value.type === "JSXExpressionContainer") {
                    exportDefaultProps.push(
                      t.objectProperty(
                        t.identifier(attr.name.name),
                        attr.value.expression,
                      ),
                    );
                  }
                  if (
                    attr.value.type === "StringLiteral" &&
                    attr.name.name === "title"
                  ) {
                    const titleParts = attr.value.value.split("/");
                    if (titleParts.length > 1) {
                      storyName = titleParts.pop();
                      exportDefaultProps.push(
                        t.objectProperty(
                          t.identifier(attr.name.name),
                          t.stringLiteral(titleParts.join("/")),
                        ),
                      );
                    } else {
                      storyName = titleParts[0];
                    }
                  }
                });
                if (exportDefaultProps.length > 0) {
                  program.pushContainer(
                    "body",
                    t.exportDefaultDeclaration(
                      t.objectExpression(exportDefaultProps),
                    ),
                  );
                }

                program
                  .get("body")[0]
                  .container.push(
                    t.expressionStatement(
                      t.assignmentExpression(
                        "=",
                        t.memberExpression(
                          t.identifier("MDXContent"),
                          t.identifier("storyName"),
                        ),
                        t.stringLiteral(storyName),
                      ),
                    ),
                  );
              });
            }
            if (specifierName === "Story") {
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
          }
        });
      },
    },
  };
};

const prepare = async (code, filename, transformMdx = false) => {
  const inputCode = transformMdx
    ? String(
        await compile(code, {
          jsx: true,
          providerImportSource: "@mdx-js/react",
        }),
      )
    : code;
  const ast = getAst(inputCode, filename);
  const output = await transformFromAstAsync(ast, inputCode, {
    plugins: [transformPlugin],
  });
  let result = output?.code
    ?.replace("export default MDXContent;", "")
    .replace("function MDXContent(", "export function MDXContent(");

  if (!result.includes("MDXContent.storyName")) {
    result = `${result}\nMDXContent.storyName = 'Readme';`;
  }
  return result;
};

export default prepare;
