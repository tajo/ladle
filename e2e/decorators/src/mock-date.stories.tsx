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

export const Instanceof: Story = () => {
  const mockDate = new Date();
  const realDate = new Date(1234);

  return (
    <dl>
      <dt>mockDate instanceof Date:</dt>
      <dd data-testid="mockDate">{mockDate instanceof Date ? "yes" : "no"}</dd>
      <dt>realDate instanceof Date:</dt>
      <dd data-testid="realDate">{realDate instanceof Date ? "yes" : "no"}</dd>
    </dl>
  );
};

Instanceof.meta = {
  mockDate: "1995-12-17T03:24:00",
};
