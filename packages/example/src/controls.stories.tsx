import type { Story } from "@ladle/react";

export const AllControls: Story<{
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
          Label: {label} {i} {variant} {size}
        </button>
      ))}
    </p>
    <p>Colors: {colors.join(",")}</p>
    <p>{getLabel()}</p>
  </>
);

AllControls.args = {
  label: "My Button",
  disabled: false,
  count: 2,
  colors: ["Red", "Blue"],
  getLabel: () => "Label",
};
AllControls.argTypes = {
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

export const Controls: Story<{
  label: string;
  disabled: boolean;
  count: number;
  colors: string[];
  variant: string;
  size: string;
  getLabel: () => string;
}> = ({ count, disabled, label, colors, getLabel, variant, size }) => (
  <>
    <p>Count: {count}</p>
    <p>Disabled: {disabled ? "yes" : "no"}</p>
    <p>Label: {label}</p>
    <p>Colors: {colors.join(",")}</p>
    <p>{getLabel()}</p>
    <p>Variant: {variant}</p>
    <p>Size: {size}</p>
  </>
);

Controls.args = {
  label: "Hello world",
  disabled: false,
  count: 2,
  colors: ["Red", "Blue"],
  getLabel: () => "Label",
};
Controls.argTypes = {
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
