import btraverse from "@babel/traverse";
import btemplate from "@babel/template";
import bgenerate from "@babel/generator";

export const traverse =
  //@ts-ignore
  typeof btraverse === "function" ? btraverse : btraverse.default;
export const template =
  //@ts-ignore
  typeof btemplate === "function" ? btemplate : btemplate.default;
export const generate =
  //@ts-ignore
  typeof bgenerate === "function" ? bgenerate : bgenerate.default;
