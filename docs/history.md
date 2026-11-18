# Module: history

**File:** `\packages\ladle\lib\app\src\history.ts`

## Overview

Module `history` contains 4 analyzed entities.

```
import { createBrowserHistory } from "history";
import queryString from "query-string";
import type { GlobalState } from "../../shared/types";
import { ControlType } from "../../shared/types";
import config from "./get-config";
import debug from "./debug";

export const history = createBrowserHistory();
export { Action } from "history";

export const resetParams = () => {
  history.push(getHref({}));
};

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
  const queryParams = queryString.parse(location.search);
  const userQueryParams: { [key: string]: string } = {};
  Object.keys(queryParams).forEach((key) => {
    if (!key.startsWith("arg-")) {
      userQueryParams[key] = queryParams[key] as string;
    }
  });
  const params = {
    ...userQueryParams,
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
        if (arg.type === Co
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `history.resetParams` | function | No description |
| `history.getHref` | function | No description |
| `history.removeDefaultValues` | function | No description |
| `history.modifyParams` | function | No description |

## Git History

- Commits: 9
- Authors: 2
- Bug fixes: 1
- Features: 3

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
