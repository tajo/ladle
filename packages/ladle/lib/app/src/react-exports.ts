// we import some React APIs in our vite plugin generated modules
// we re-export it through this addition module so we don't have to
// reference correct React version there
export { lazy, createElement, Fragment } from "react";
