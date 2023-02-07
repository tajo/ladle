/*@jsxRuntime automatic @jsxImportSource react*/
import { Story } from "@ladle/react";

function _createMdxContent(props) {
  const _components = Object.assign(
    {
      h1: "h1",
      p: "p",
      code: "code",
    },
    props.components,
  );
  return (
    <>
      <_components.h1>{"MDX Button"}</_components.h1>
      {"\n"}
      <_components.p>
        {"With "}
        <_components.code>{"MDX"}</_components.code>
        {", you can define button w/e."}
      </_components.p>
      {"\n"}
      <Story name="First">
        <button>{"Haha"}</button>
      </Story>
    </>
  );
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? (
    <MDXLayout {...props}>
      <_createMdxContent {...props} />
    </MDXLayout>
  ) : (
    _createMdxContent(props)
  );
}
export default MDXContent;
export const LadleStory0 = () => (
  <>
    <button>{"Haha"}</button>
  </>
);
LadleStory0.storyName = "First";
