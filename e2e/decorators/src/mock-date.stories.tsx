import type { Story } from "@ladle/react";

export const Active: Story = () => {
  const date = new Date();
  return (
    <h1>
      {date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </h1>
  );
};

Active.meta = {
  mockDate: "1995-12-17T03:24:00",
};

export const Inactive: Story = () => {
  const date = new Date();
  return (
    <h1>
      {date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </h1>
  );
};
