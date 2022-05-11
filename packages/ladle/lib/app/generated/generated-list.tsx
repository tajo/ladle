// we use a vite plugin to dynamically replace content of this file
// when a story is changed.....
import { lazy } from "react";
import * as React from "react";
export const Foo = lazy(() => Promise.resolve() as any);
export const list = ["Foo"];
export const config = {};
export const errorMessage = "";
export const stories: {
  [key: string]: { entry: string; locStart: number; locEnd: number };
} = {};
export const storySource: { [key: string]: string } = {};

export const Provider = ({ children }: { children: any }) =>
  /*#__PURE__*/ React.createElement(React.Fragment, null, children);
