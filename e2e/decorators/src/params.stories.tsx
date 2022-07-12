export default {
  title: "Root / Examples",
  meta: {
    drink: "coke",
    food: "burger",
  },
};

export const First = () => {
  return <h1>first</h1>;
};

export const Second = () => {
  return <h1>second</h1>;
};
Second.storyName = "Second Renamed";
Second.meta = {
  drink: "water",
};
