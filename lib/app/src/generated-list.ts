// we use a snowpack plugin to dynamically replace content of this file
// when a story is changed
import { lazy } from "react";
export const Foo = lazy(() =>
  //@ts-ignore
  import("./foo.js").then((module) => {
    return {
      default: module.Yikes,
    };
  })
);
export let list = ["Foo"];
