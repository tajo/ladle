import type { Story } from "../packages/ladle/lib/app/exports";

type FooProps = {
  foo: string;
  bar: number;
};

export const Types: Story<FooProps> = ({ foo, bar }) => {
  return <div>{foo + bar}</div>;
};

Types.argTypes = {
  foo: {
    control: {
      type: "select",
      options: [
        "foo",
        // @ts-expect-error - 1 is not a string
        5,
      ],
    },
  },
  bar: {
    control: {
      type: "select",
      options: [1, 2, 3],
    },
  },
};

export const Types2: Story<FooProps> = ({ foo, bar }) => {
  return <div>{foo + bar}</div>;
};

Types2.argTypes = {
  foo: {
    control: {
      type: "select",
      options: ["foo", "bar"],
    },
  },
  bar: {
    control: {
      type: "select",
      options: [1, 2, 3],
    },
  },
  // @ts-expect-error - baz is not a valid arg
  baz: {
    control: {},
  },
};
