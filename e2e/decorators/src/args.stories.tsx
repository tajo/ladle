import type { Story, StoryDecorator } from "@ladle/react";

export default {
  decorators: [
    (Component, context) => {
      console.log("first", context);
      return (
        <div style={{ border: "5px solid red" }}>
          <p>first {context.globalState.control.label.value}</p>
          <Component />
        </div>
      );
    },
    (Component, context) => {
      console.log("second", context);
      return (
        <div style={{ border: "5px solid blue" }}>
          <p>second {context.globalState.control.label.value}</p>
          <Component />
        </div>
      );
    },
    (Component, context) => {
      console.log("third", context);
      return (
        <div style={{ border: "5px solid green" }}>
          <p>third {context.globalState.control.label.value}</p>
          <Component />
        </div>
      );
    },
  ] as StoryDecorator[],
};

const Card: Story<{
  label: string;
}> = ({ label }) => <p>Label: {label}</p>;

export const CardHello = Card.bind({});

CardHello.decorators = [
  (Component, context) => {
    console.log("private", context);
    return (
      <div style={{ border: "5px solid pink" }}>
        <p>private {context.globalState.control.label.value}</p>
        <Component />
      </div>
    );
  },
];

CardHello.args = {
  label: "Hello",
};
