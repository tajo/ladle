export const args = {
  test: true,
};

export const argTypes = {
  background: {
    name: "Main background",
    control: {
      type: "background",
      labels: {
        // 'labels' maps option values to string labels
        purple: "Purple fun",
      },
    },
    options: ["purple", "blue", "white", "pink"],
    defaultValue: "white",
  },
};
