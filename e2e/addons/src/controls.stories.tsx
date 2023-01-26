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
    options: ["primary", "secondary", true, false],
    control: { type: "radio" },
    defaultValue: "primary",
  },
  size: {
    options: ["small", "medium", "big", true, false],
    control: { type: "select" },
  },
  airports: {
    options: ["sfo", "slc", "prg"],
    control: { type: "check" },
  },
};

export const Initial: Story<{
  variant: string;
  airports: string[];
  cities: string[];
  empty: string;
  countries: string;
  food: string;
}> = ({ variant, airports, cities, empty, countries, food }) => (
  <div id="content">
    <p>Variant: {variant}</p>
    <p>Airport: {airports}</p>
    <p>Country: {countries}</p>
    <p>Empty: {empty}</p>
    <p>City: {cities}</p>
    <p>Food: {food}</p>
  </div>
);

Initial.args = {
  variant: "secondary",
};

Initial.argTypes = {
  variant: {
    options: ["primary", "secondary"],
    control: { type: "radio" },
    defaultValue: "primary",
  },
  food: {
    options: ["burger", "pizza"],
    control: { type: "radio" },
  },
  airports: {
    options: ["sfo", "slc", "prg"],
    control: { type: "check" },
    defaultValue: ["slc"],
  },
  countries: {
    options: ["USA", "Germany"],
    control: { type: "select" },
  },
  empty: {
    control: { type: "check" },
  },
};
