import type { Story } from "@ladle/react";

const Template: Story<{ label: string; disabled: boolean; count: number }> = ({
  count,
  disabled,
  label,
}) => (
  <p>
    {Array.from(Array(count)).map((_, i) => (
      <button key={i} disabled={disabled}>
        iiihaasd {label} {i}
      </button>
    ))}
  </p>
);

export function FnBtn() {
  return <button>FnButton</button>;
}

export const Second = Template.bind({});
Second.args = {
  label: "My Button",
  disabled: false,
  count: 2,
};
