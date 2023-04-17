import React from "react";
import ArgsProvider from "./args-provider";
import { args, argTypes } from "virtual:generated-list";
import { useLadleContext } from "./context";
import type { StoryDecorator } from "../../shared/types";

export default function composeEnhancers(module: any, storyName: string) {
  let decorators: StoryDecorator[] = [];
  const props = {
    args: {
      ...args,
      ...(module.default && module.default.args ? module.default.args : {}),
      ...(module[storyName].args ? module[storyName].args : {}),
    },
    argTypes: {
      ...argTypes,
      ...(module.default && module.default.argTypes
        ? module.default.argTypes
        : {}),
      ...(module[storyName].argTypes ? module[storyName].argTypes : {}),
    },
    component: module[storyName],
  };
  if (module[storyName] && Array.isArray(module[storyName].decorators)) {
    decorators = [...decorators, ...module[storyName].decorators];
  }
  if (module.default && Array.isArray(module.default.decorators)) {
    decorators = [...decorators, ...module.default.decorators];
  }

  return function RenderDecoratedStory() {
    const { globalState } = useLadleContext();
    const WithArgs = React.useMemo(
      () =>
        function RenderWithArgs() {
          return <ArgsProvider {...props} />;
        },
      [],
    );
    if (decorators.length === 0) return <WithArgs />;
    const getBindedDecorator = (i: number) => {
      return React.useRef(() => {
        const context = useLadleContext();
        return decorators[i](
          i === 0 ? WithArgs : getBindedDecorator(i - 1),
          context,
        );
      }).current;
    };
    const Decorated = getBindedDecorator(decorators.length - 1);
    return globalState.controlInitialized ? <Decorated /> : <WithArgs />;
  };
}
