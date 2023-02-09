import type { Story } from "../packages/ladle/lib/app/exports";

type FooProps = {
  foo: string;
  bar: number;
};

function Foo({ foo, bar }: FooProps) {
  return <div>{foo + bar}</div>;
}

export const Args: Story<FooProps> = Foo;

Args.args = {
  foo: "foo",
  // @ts-expect-error - bar is not a string
  bar: "1",
};

export const Args2: Story<FooProps> = Foo;

Args2.args = {
  foo: "foo",
  bar: 1,
  // @ts-expect-error - baz is not a valid arg
  baz: "baz",
};
