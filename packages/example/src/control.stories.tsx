import type { Story } from "@ladle/react";

const Card: Story<{
  label: string;
}> = ({ label }) => <p>Label: {label}</p>;

export const CardHello = Card.bind({});

CardHello.args = {
  label: "Hello",
};

export const CardWorld = Card.bind({});
CardWorld.args = {
  label: "World",
};
