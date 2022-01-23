/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createBrowserHistory } from "../deps/history";
import queryString from "../deps/query-string";
import type { GlobalState } from "../../shared/types";
import { ControlType } from "../../shared/types";
import config from "./get-config";
import debug from "./debug";

export const history = createBrowserHistory();

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

export const modifyParams = (params: Partial<GlobalState>) => {
  removeDefaultValues(params);
  const urlParams = queryString.parse(location.search);
  const noUpdateNeeded =
    Object.keys(params).length === Object.keys(urlParams).length &&
    Object.keys(params).every((key) => {
      const val = params[key as keyof GlobalState];
      if (typeof val === "boolean") {
        return val === (urlParams[key] === "true" ? true : false);
      }
      if (typeof val === "number") {
        return val === parseInt(urlParams[key] as string);
      }
      return val === urlParams[key];
    });
  if (noUpdateNeeded) {
    debug("No URL updated needed");
    return;
  }
  history.push(getHref(params));
};

export const getHref = (params: Partial<GlobalState>) => {
  removeDefaultValues(params);
  const encodedParams: { [key: string]: any } = {};
  Object.keys(params).forEach((key: string) => {
    if (key === "control") {
      // for controls we are spreading individual args into URL
      Object.keys(params[key] as any).forEach((argKey) => {
        const arg = (params[key] as any)[argKey];

        let type = "s";
        let value = arg.value;
        let isValueDefault = false;
        switch (arg.type) {
          case ControlType.Boolean:
            type = "b";
            break;
          case ControlType.Number:
            type = "n";
            break;
          case ControlType.Radio:
            type = "r";
            break;
          case ControlType.Select:
            type = "l";
            break;
          case ControlType.Complex:
            type = "c";
            value = encodeURI(JSON.stringify(arg.value));
            try {
              isValueDefault =
                JSON.stringify(arg.value) === JSON.stringify(arg.defaultValue);
            } catch (e) {}
            break;
        }
        if (!isValueDefault && value !== arg.defaultValue) {
          encodedParams[`arg-${type}-${argKey}`] = value;
        }
      });
    } else {
      encodedParams[key] = (params as any)[key];
    }
  });
  return `?${queryString.stringify(encodedParams)}`;
};
