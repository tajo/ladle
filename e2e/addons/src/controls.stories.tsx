import type { Story } from "@ladle/react";

export default {
  argTypes: {
    cities: {
      options: ["Prague", "NYC"],
      control: { type: "check" },
    },
  },
};

export const Controls: Story<{
  label: string;
  disabled: boolean;
  count: number;
  colors: string[];
  variant: string;
  size: string;
  airports: string;
  cities: string;
}> = ({ count, disabled, label, colors, variant, size, airports, cities }) => (
  <div id="content">
    <p>Count: {count}</p>
    <p>Disabled: {disabled ? "yes" : "no"}</p>
    <p>Label: {label}</p>
    <p>Colors: {colors.join(",")}</p>
    <p>Variant: {variant}</p>
    <p>Size: {size}</p>
    {airports && airports.length ? <p>Airport: {airports}</p> : ""}
    {cities && cities.length ? <p>Cities: {cities}</p> : ""}
    {typeof variant === "undefined" && <p>variant is undefined</p>}
    {typeof variant === "boolean" && <p>variant is boolean</p>}
    {typeof variant === "string" && <p>variant is string</p>}
    {typeof size === "undefined" && <p>size is undefined</p>}
    {typeof size === "boolean" && <p>size is boolean</p>}
    {typeof size === "string" && <p>size is string</p>}
  </div>
);

Controls.args = {
  label: "Hello world",
  disabled: false,
  count: 2,
  colors: ["Red", "Blue"],
};
Controls.argTypes = {
  variant: {
    options: ["primary", "secondary", true, false, undefined],
    control: { type: "radio" },
    defaultValue: "primary",
  },
  size: {
    options: ["small", "medium", "big", true, false, undefined],
    control: { type: "select" },
  },
  airports: {
    options: ["sfo", "slc", "prg"],
    control: { type: "check" },
  },
};
