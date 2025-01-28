import * as React from "react";
import ArgsProvider from "./args-provider";
import Msw from "./msw";
import { args, argTypes } from "virtual:generated-list";
import { useLadleContext } from "./context";
import type { StoryDecorator } from "../../shared/types";
import type { RequestHandler } from "msw";

export default function composeEnhancers(module: any, storyName: string) {
  let decorators: StoryDecorator[] = [];
  let parameters: { [key: string]: any } = {};
  let mswHandlers: RequestHandler[] = [];
  if (module.default && module.default.msw) {
    mswHandlers = module.default.msw;
  }
  if (module[storyName] && module[storyName].msw) {
    mswHandlers = module[storyName].msw;
  }
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
  parameters = {
    ...(module.default && module.default.parameters
      ? module.default.parameters
      : {}),
    ...(module[storyName].parameters ? module[storyName].parameters : {}),
  };

  return function RenderDecoratedStory() {
    const { globalState } = useLadleContext();
    const WithArgs = React.useMemo(
      () =>
        function RenderWithArgs() {
          return (
            <Msw msw={mswHandlers}>
              <ArgsProvider {...props} />
            </Msw>
          );
        },
      [],
    );
    if (decorators.length === 0) return <WithArgs />;
    const getBindedDecorator = (i: number) => {
      return React.useRef(() => {
        const context = useLadleContext();
        const args: { [key: string]: any } = {};
        Object.keys(context.globalState.control).forEach(
          (key) => (args[key] = context.globalState.control[key].value),
        );
        return decorators[i](i === 0 ? WithArgs : getBindedDecorator(i - 1), {
          ...context,
          parameters,
          argTypes: props.argTypes,
          args,
        });
      }).current;
    };
    const Decorated = getBindedDecorator(decorators.length - 1);
    return globalState.controlInitialized ? <Decorated /> : <WithArgs />;
  };
}
