/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createBrowserHistory } from "history";
import queryString from "query-string";
import type { GlobalState } from "../../shared/types";
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
  return `?${queryString.stringify(params)}`;
};
