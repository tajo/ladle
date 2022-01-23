import type { Story } from "@ladle/react";

const Template: Story<{
  label: string;
  disabled: boolean;
  count: number;
  colors: string[];
  variant: string;
  size: string;
  getLabel: () => string;
}> = ({ count, disabled, label, colors, getLabel, variant, size }) => (
  <>
    <p>
      {Array.from(Array(count)).map((_, i) => (
        <button key={i} disabled={disabled}>
          iiihaasd {label} {i} {variant} {size}
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
Second.argTypes = {
  variant: {
    options: ["primary", "secondary"],
    control: { type: "radio" },
    defaultValue: "primary",
  },
  size: {
    options: ["small", "medium", "big", "huuuuge"],
    control: { type: "select" },
  },
};
