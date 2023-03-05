import * as React from "react";
import type { StoryDefault, Story } from "../../lib/app/exports";

export default {
  title: "Title",
  meta: {
    baseweb: {
      foo: "title",
    },
  },
} satisfies StoryDefault;

export const Cat: Story = () => {
  return <h1>Cat</h1>;
};
