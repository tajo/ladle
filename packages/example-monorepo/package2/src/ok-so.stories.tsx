import type { StoryDefault, Story } from "@ladle/react";
import identity from "./syntax";

export default {
  title: "Test",
} satisfies StoryDefault;

export const Yeah: Story = () => {
  return (
    <div>
      <h1>This story does not need React import {identity("hey")}</h1>
    </div>
  );
};
