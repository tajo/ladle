import * as React from "react";
import type { StoryDefault, Story } from "../../lib/app/exports";

export default {
  title: "Title",
  meta: {
    baseweb: {
      theme: "dark",
      browsers: ["chrome", "webkit"],
    },
  },
} satisfies StoryDefault;

export const Cat: Story = () => {
  return <h1>Cat</h1>;
};

Cat.meta = {
  baseweb: {
    browsers: ["chrome", "firefox"],
    width: "500px",
  },
  links: true,
};

export const Dog: Story = () => {
  return <h1>Dog</h1>;
};
