import * as React from "react";
import { useLink } from "@ladle/react";

export const Link = () => {
  const linkTo = useLink();
  return (
    <button onClick={() => linkTo("controls--first")}>Controls stories</button>
  );
};
