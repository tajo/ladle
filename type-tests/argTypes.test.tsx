import type { Story } from "../packages/ladle/lib/app/exports";

type FooProps = {
  foo: string;
  bar: number;
};

function Foo({ foo, bar }: FooProps) {
  return <div>{foo + bar}</div>;
}

export const ArgTypes: Story<FooProps> = Foo;

ArgTypes.argTypes = {
  foo: {
    control: {
      type: "select",
      options: [
        "foo",
        // // @ts-expect-error - 1 is not a string
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

export const ArgTypes2: Story<FooProps> = Foo;

ArgTypes2.argTypes = {
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

export const ArgTypes3: Story<FooProps> = Foo;

ArgTypes3.argTypes = {
  foo: {
    control: {
      // @ts-expect-error - type is not a valid control type
      type: "potato",
    },
  },
};

export const ArgTypes4: Story<FooProps> = ({ foo, bar }) => {
  return <div>{foo + bar}</div>;
};

ArgTypes4.argTypes = {
  foo: {
    control: {
      type: "select",
      options: ["foo", "bar"],
    },
    // @ts-expect-error - defaultValue is not a string
    defaultValue: 5,
  },
};
