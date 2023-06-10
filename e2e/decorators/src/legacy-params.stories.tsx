import type { StoryDefault, Story } from "@ladle/react";

export default {
  parameters: {
    one: 1,
    two: 2,
  },
  decorators: [
    (Stories: React.FC, context) => (
      <>
        Decorator {context.parameters.one}
        <Stories />
      </>
    ),
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
