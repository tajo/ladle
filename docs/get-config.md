# Module: get-config

**File:** `\packages\ladle\lib\app\src\get-config.ts`

## Overview

Module `get-config` contains 0 analyzed entities.

```
import merge from "lodash.merge";
import { config, stories } from "virtual:generated-list";
import defaultConfig from "../../shared/default-config";
import type { Config } from "../../shared/types";
import debug from "./debug";
import { sortStories } from "./story-name";

if (Object.keys(config).length === 0) {
  debug("No custom config found.");
} else {
  if (config.storyOrder && typeof config.storyOrder === "string") {
    config.storyOrder = new Function("return " + config.storyOrder)();
  }
  debug(`Custom config found:`);
  debug(config);
}

// don't merge default width options
if (config?.addons?.width?.options) {
  defaultConfig.addons.width.options = {};
}
const mergedConfig: Config = merge(defaultConfig, config);
if (mergedConfig.defaultStory === "") {
  mergedConfig.defaultStory = sortStories(
    Object.keys(stories),
    mergedConfig.storyOrder,
  )[0];
}

// don't merge hotkeys
mergedConfig.hotkeys = {
  ...mergedConfig.hotkeys,
  ...config.hotkeys,
};

debug("Final config", mergedConfig);

export default mergedConfig;
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 5
- Authors: 1
- Bug fixes: 0
- Features: 3

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
