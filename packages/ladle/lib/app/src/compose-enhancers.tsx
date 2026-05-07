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
  // CSF v3 support: the named export may be a plain object
  // ({ args?, render?, … }) rather than a React.FC. ArgsProvider does
  // React.createElement(component, props), which throws on an object.
  // Resolve to a real component before passing it down.
  const storyExport = module[storyName];
  let resolvedComponent: any;
  if (typeof storyExport === "function") {
    // CSF v2 — the named export IS the component.
    resolvedComponent = storyExport;
  } else if (storyExport && typeof storyExport === "object") {
    if (typeof storyExport.render === "function") {
      const renderFn = storyExport.render;
      resolvedComponent = (renderProps: any) => renderFn(renderProps);
    } else if (module.default && module.default.component) {
      // Args-only / empty / decorators-only — render meta.component with args.
      resolvedComponent = module.default.component;
    } else {
      // Defensive fallback.
      resolvedComponent = (renderProps: any) =>
        renderProps && renderProps.children ? renderProps.children : null;
    }
  } else {
    resolvedComponent = storyExport;
  }
  const props = {
    args: {
      ...args,
      ...(module.default && module.default.args ? module.default.args : {}),
      ...(storyExport && storyExport.args ? storyExport.args : {}),
    },
    argTypes: {
      ...argTypes,
      ...(module.default && module.default.argTypes
        ? module.default.argTypes
        : {}),
      ...(storyExport && storyExport.argTypes ? storyExport.argTypes : {}),
    },
    component: resolvedComponent,
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
