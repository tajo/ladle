import type { Story } from "../packages/ladle/lib/app/exports";

type FooProps = {
  foo: string;
  bar: number;
};

export const Types: Story<FooProps> = ({ foo, bar }) => {
  return <div>{foo + bar}</div>;
};

Types.args = {
  foo: "foo",
  // @ts-expect-error - bar is not a string
  bar: "1",
};
