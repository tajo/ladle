import type { Story } from "../packages/ladle-react/lib/app/exports";

type FooProps = {
  foo: string;
  bar: number;
};

function Foo({ foo, bar }: FooProps) {
  return <div>{foo + bar}</div>;
}

export const Meta: Story<FooProps> = Foo;

// @ts-expect-error - meta is not a valid arg
Meta.meta = "foo";

export const Meta2: Story<FooProps> = Foo;

Meta2.meta = {};
