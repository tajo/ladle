import type { Story, StoryDecorator } from "@ladle/react";

export default {
  decorators: [
    (Stories: React.FC) => (
      <>
        Decorator 1<Stories />
      </>
    ),
    (Stories: React.FC) => (
      <>
        Decorator 2<Stories />
      </>
    ),
  ] as StoryDecorator[],
};

export const World: Story = () => {
  return <h2>world</h2>;
};

World.decorators = [
  (Stories: React.FC) => (
    <>
      Decorator 3<Stories />
    </>
  ),
];
