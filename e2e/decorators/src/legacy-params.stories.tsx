import type { StoryDefault, Story } from "@ladle/react";

export default {
  args: {
    flag: "czech",
  },
  argTypes: {
    size: {
      options: ["small", "medium", "big", "huuuuge"],
      control: { type: "select" }, // or type: multi-select
    },
  },
  parameters: {
    one: 1,
    two: 2,
  },
  decorators: [
    (Stories: React.FC, context) => {
      console.log(context);
      return (
        <>
          Decorator {context.parameters.one}
          {context.args.flag}
          <Stories />
        </>
      );
    },
    (Stories: React.FC, context) => (
      <>
        Decorator {context.parameters.two}
        <Stories />
      </>
    ),
  ],
} satisfies StoryDefault;

export const World: Story = () => {
  return <h2>world</h2>;
};

World.parameters = {
  two: 5,
};
