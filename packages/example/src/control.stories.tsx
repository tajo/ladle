import type { Story } from "@ladle/react";

export default {
  title: "ThisIsSoLongThatItShouldBeTruncatedOrElse/Haha",
};

const Card: Story<{
  label: string;
}> = ({ label }) => <p>Label: {label}</p>;

export const CardHello = Card.bind({});

export const ThisIsExtremelyLongAndShouldBeTruncated = () => <hr></hr>;

CardHello.args = {
  label: "Hello",
};

export const CardWorld = Card.bind({});
CardWorld.args = {
  label: "World",
};
