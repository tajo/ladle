import type { Story } from "@ladle/react";
import { action, linkTo } from "@ladle/react";

export const Controls: Story<{
  label: string;
  disabled: boolean;
  onClick: () => void;
  count: number;
  colors: string[];
  variant: string;
  size: string;
}> = ({ count, disabled, label, colors, variant, size, onClick }) => {
  if (count > 2) {
    return <p>done</p>;
  }
  return (
    <>
      <p>Count: {count}</p>
      <p>Disabled: {disabled ? "yes" : "no"}</p>
      <p>Label: {label}</p>
      <p>Colors: {colors.join(",")}</p>
      <p>Variant: {variant}</p>
      <p>Size: {size}</p>
      <button onClick={onClick}>Click</button>
      <button onClick={action("second")}>Second button</button>
      <button onClick={linkTo("a11y--issues")}>Link button</button>
    </>
  );
};

Controls.args = {
  label: "Hello world",
  disabled: false,
  count: 2,
  colors: ["Red", "Blue"],
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
  onClick: {
    action: "clicked",
  },
};
