// @ts-nocheck
import React from "react";
import ArgsProvider from "./args-provider";
import config from "./get-config";
import { args, argTypes } from "virtual:generated-list";
import { useLadleContext } from "./context";

export default function composeEnhancers(module: any, storyName: string) {
  let decorators: Function[] = [];
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

  return () => {
    const { globalState, dispatch } = useLadleContext();
    return React.useMemo(
      () =>
        globalState.controlInitialized ? (
          decorators.reduce(
            (story, decorator) =>
              decorator(() => story, { globalState, dispatch, config }),
            <ArgsProvider {...props} />,
          )
        ) : (
          <ArgsProvider {...props} />
        ),
      [globalState.controlInitialized],
    );
  };
}
