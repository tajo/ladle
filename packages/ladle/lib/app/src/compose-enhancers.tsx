// @ts-nocheck
import React from "react";
import ArgsProvider from "./args-provider";
import type { StoryProps } from "../../shared/types";

export default function composeEnhancers(module: any, storyName: string) {
  let funcs: any[] = [];
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
    const ComposedDecorator = () => <ArgsProvider {...props} />;
    return ComposedDecorator;
  }

  const ComposedDecorator = () => (
    <ArgsProvider
      {...props}
      decorator={(component: React.FC, context: StoryProps) =>
        funcs.length === 1
          ? funcs[0](component, context)
          : funcs.reduceRight(
              (accumulator, currentValue) => (Story: React.FC) =>
                accumulator(() => currentValue(Story, context), context),
            )(component)
      }
    />
  );
  return ComposedDecorator;
}
