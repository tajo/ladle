import type { Story } from "@ladle/react";
import { useContext } from "react";
import { MyContext } from "../.ladle/components";

export const World: Story = () => {
  const value = useContext(MyContext);
  return <h1>Hello World - {value}</h1>;
};
