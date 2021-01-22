// we use a snowpack plugin to dynamically replace content of this file
// when a story is changed
import { lazy } from "react";
import * as React from "react";
//@ts-ignore
export const Foo = lazy(() => Promise.resolve());
export let list = ["Foo"];
export const config = {};
export const stories = {};

//@ts-ignore
export const Provider = ({ children }) =>
  /*#__PURE__*/ React.createElement(React.Fragment, null, children);
