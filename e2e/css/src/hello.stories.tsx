import type { Story } from "@ladle/react";

// @ts-ignore
import classes from "./more.module.css";

export const World: Story = () => {
  return (
    <>
      <h1>Yellow</h1>
      <h2 className={classes.red}>Red</h2>
      <h3 className="text-xl md:text-4xl">Tailwind</h3>
    </>
  );
};
