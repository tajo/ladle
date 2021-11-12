import { useContext } from "react";
import { MyContext } from "../.ladle/components";

export const World = () => {
  const value = useContext(MyContext);
  return <h1>Hello World - {value}</h1>;
};
