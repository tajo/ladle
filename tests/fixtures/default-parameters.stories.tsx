import * as React from "react";

export default {
  title: "Title",
  parameters: {
    baseweb: {
      foo: "title",
    },
  },
};

export const Cat: React.FC = () => {
  return <h1>Cat</h1>;
};
