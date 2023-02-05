/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createBrowserHistory } from "history";
import queryString from "query-string";
import type { GlobalState } from "../../shared/types";
import { ControlType } from "../../shared/types";
import config from "./get-config";
import debug from "./debug";

export const history = createBrowserHistory();
export { Action } from "history";

const removeDefaultValues = (params: Partial<GlobalState>) => {
  Object.keys(params).forEach((key) => {
    const val = params[key as keyof GlobalState];
    const defaultVal = (config.addons as any)[key]
      ? (config.addons as any)[key].defaultState
      : "$$LADLE_unknown";
    if (val === defaultVal) {
      //@ts-ignore
      delete params[key];
    }
  });
};

export const modifyParams = (globalState: GlobalState) => {
  if (!globalState.controlInitialized) return;
  const params = {
    mode: globalState.mode,
    rtl: globalState.rtl,
    source: globalState.source,
    story: globalState.story,
    theme: globalState.theme,
    width: globalState.width,
    control: globalState.control,
  };
  removeDefaultValues(params);
  if (location.search !== getHref(params)) {
    debug(`Updating URL to ${getHref(params)}`);
    history.push(getHref(params));
  }
};

export const getHref = (params: Partial<GlobalState>) => {
  removeDefaultValues(params);
  const encodedParams: { [key: string]: any } = {};
  Object.keys(params).forEach((key: string) => {
    if (key === "control") {
      // for controls we are spreading individual args into URL
      Object.keys(params[key] as any).forEach((argKey) => {
        const arg = (params[key] as any)[argKey];
        if (arg.type === ControlType.Action) {
          // a special case, actions are handled by the addon-action
          return;
        }
        let value = arg.value;
        let isValueDefault = false;

        value = encodeURI(
          typeof arg.value === "string" ? arg.value : JSON.stringify(arg.value),
        );
        try {
          isValueDefault =
            JSON.stringify(arg.value) === JSON.stringify(arg.defaultValue);
          if (
            !isValueDefault &&
            JSON.stringify(value) !== JSON.stringify(arg.defaultValue)
          ) {
            encodedParams[`arg-${argKey}`] = value;
          }
        } catch (e) {}
      });
    } else {
      encodedParams[key] = (params as any)[key];
    }
  });
  return `?${queryString.stringify(encodedParams)}`;
};
