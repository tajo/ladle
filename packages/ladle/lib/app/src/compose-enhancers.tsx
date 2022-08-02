// @ts-nocheck
import React from "react";
import ArgsProvider from "./args-provider";

export default function composeEnhancers(module: any, storyName: string) {
  let funcs: any[] = [];
  const hasArgs = module[storyName].args || module[storyName].argTypes;
  const props = {
    args: module[storyName].args,
    argTypes: module[storyName].argTypes,
    component: module[storyName],
  };
  if (module[storyName] && Array.isArray(module[storyName].decorators)) {
    funcs = [...funcs, ...module[storyName].decorators];
  }
  if (module.default && Array.isArray(module.default.decorators)) {
    funcs = [...funcs, ...module.default.decorators];
  }
  if (funcs.length === 0) {
    return hasArgs ? () => <ArgsProvider {...props} /> : module[storyName];
  }
  if (funcs.length === 1) {
    const res = funcs[0](module[storyName]);
    return hasArgs
      ? () => <ArgsProvider {...props}>{res}</ArgsProvider>
      : () => res;
  }
  const res = funcs.reduceRight(
    (a, b) =>
      (...args: any) =>
        a(() => b(...args)),
  )(module[storyName]);
  return hasArgs
    ? () => <ArgsProvider {...props}>{res}</ArgsProvider>
    : () => res;
}
