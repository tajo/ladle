import type { Story } from "@ladle/react";

export const Cat: Story = () => {
  const Stop = { storyName: "" };
  // should be ignored
  Stop.storyName = "What";
  return <h1>Cat</h1>;
};

Cat.storyName = "Doggo";
// @ts-expect-error
Cat.foo = "Ha";

export const CapitalCity: Story = () => {
  return <h1>DC</h1>;
};

export const CapitalReplaced: Story = () => {
  return <h1>CapitalReplaced</h1>;
};
CapitalReplaced.storyName = "Champs Élysées";
