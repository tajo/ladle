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

export const Types2: Story<FooProps> = ({ foo, bar }) => {
  return <div>{foo + bar}</div>;
};

Types2.args = {
  foo: "foo",
  bar: 1,
  // @ts-expect-error - baz is not a valid arg
  baz: "baz",
};
