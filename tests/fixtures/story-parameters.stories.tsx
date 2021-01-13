import * as React from "react";

export default {
  title: "Title",
  parameters: {
    baseweb: {
      theme: "dark",
      browsers: ["chrome", "webkit"],
    },
  },
};

export const Cat = () => {
  return <h1>Cat</h1>;
};

Cat.parameters = {
  baseweb: {
    browsers: ["chrome", "firefox"],
    width: "500px",
  },
  links: true,
};

export const Dog = () => {
  return <h1>Dog</h1>;
};
