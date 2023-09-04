import type { StoryDefault, Story } from "@ladle/react";

type Props = {
  label: string;
  disabled: boolean;
  count: number;
  colors: string[];
  variant: string;
  size: string;
  range: number;
  airports: string;
  cities: string;
  mountain: string;
  snowing: boolean;
  inches: number;
  color: string;
  date: string;
};

export default {
  argTypes: {
    cities: {
      options: ["Prague", "NYC"],
      control: { type: "check" },
    },
  },
} satisfies StoryDefault<Props>;

export const Controls: Story<Props> = ({
  count,
  disabled,
  label,
  colors,
  variant,
  size,
  range,
  airports,
  cities,
  mountain,
  snowing,
  inches,
  color,
  date,
}) => (
  <div id="content">
    <p>Count: {count}</p>
    <p>Disabled: {disabled ? "yes" : "no"}</p>
    <p>Label: {label}</p>
    <p>Colors: {colors.join(",")}</p>
    <p>Variant: {variant}</p>
    <p>Size: {size}</p>
    <p>Range: {range}</p>
    <p>Mountain: {mountain}</p>
    <p>Snowing: {snowing ? "yes" : "no"}</p>
    <p>Inches: {inches}</p>
    <p>Color: {color}</p>
    <p>Date: {date}</p>
    {airports && airports.length ? <p>Airport: {airports}</p> : ""}
    {cities && cities.length ? <p>Cities: {cities}</p> : ""}
    {typeof count !== "number" && <p>count is not number</p>}
    {typeof range !== "number" && <p>range is not number</p>}
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
  mountain: {
    control: { type: "text" },
    defaultValue: "snowbird",
  },
  snowing: {
    control: { type: "boolean" },
    defaultValue: true,
  },
  inches: {
    control: { type: "number" },
    defaultValue: 12,
  },
  color: {
    control: { type: "color" },
    defaultValue: "pink",
  },
  date: {
    control: { type: "date" },
    defaultValue: "today",
  },
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
    mapping: {
      slc: "sxc",
    },
  },
  range: {
    control: { type: "range", min: 1, max: 10, step: 0.5 },
    defaultValue: 1,
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

export const KeepNumbers: Story<{ size: number }> = ({ size }) => {
  return (
    <h1>
      {size} - {typeof size}
    </h1>
  );
};
KeepNumbers.argTypes = {
  size: {
    options: [14, 16, 22, 30],
    defaultValue: 30,
    control: { type: "select" },
  },
};
