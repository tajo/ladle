import type { Story } from "@ladle/react";

export const First: Story = () => {
  // not rendering a text since fonts render differently in different operation systems
  // and we use this package in our Github Actions CI which runs Ubuntu and Windows
  // so doing a blue rectangle instead to keep the setup simple
  // ideally, you should use something like Docker to have a consistent setup across
  // the local and remote environments
  return <div style={{ width: 200, height: 100, backgroundColor: "blue" }} />;
};

export const Second: Story = () => {
  return <h1>Second</h1>;
};
Second.meta = {
  skip: true,
};
