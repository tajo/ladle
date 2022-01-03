import type { Story } from "@ladle/react";

const Template: Story<{
  label: string;
  disabled: boolean;
  count: number;
  colors: string[];
  getLabel: () => string;
}> = ({ count, disabled, label, colors, getLabel }) => (
  <>
    <p>
      {Array.from(Array(count)).map((_, i) => (
        <button key={i} disabled={disabled}>
          iiihaasd {label} {i}
        </button>
      ))}
    </p>
    <p>Colors: {colors.join(",")}</p>
    <p>{getLabel()}</p>
  </>
);

export function FnBtn() {
  return <button>FnButton</button>;
}

export const Second = Template.bind({});
Second.args = {
  label: "My Button",
  disabled: false,
  count: 2,
  colors: ["Red", "Blue"],
  getLabel: () => "Label",
};
