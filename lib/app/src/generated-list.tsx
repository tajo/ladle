// we use a snowpack plugin to dynamically replace content of this file
// when a story is changed
import { lazy } from "react";
import * as React from "react";
export const Foo = lazy(() =>
  //@ts-ignore
  import("./foo.js").then((module) => {
    return {
      default: module.Yikes,
    };
  })
);
export let list = ["Foo"];
export const config = {};
export const Provider: React.FC<{ config: any }> = ({ children }) => (
  <>{children}</>
);
