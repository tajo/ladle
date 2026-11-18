# Module: width

**File:** `\packages\ladle\lib\app\src\addons\width.tsx`

## Overview

Module `width` contains 1 analyzed entities.

```
import * as React from "react";
import queryString from "query-string";
import { useHotkeys } from "react-hotkeys-hook";
import config from "../get-config";
import { AddonProps, ActionType } from "../../../shared/types";
import { stories } from "virtual:generated-list";
import { Modal } from "../ui";
import { Width } from "../icons";

export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).width;
  let res = 0;
  Object.keys(config.addons.width.options).forEach((key) => {
    if (
      key === urlVal ||
      parseInt(urlVal as string, 10) === config.addons.width.options[key]
    ) {
      res = config.addons.width.options[key];
    }
  });
  return res !== 0 ? res : config.addons.width.defaultState;
};

export const Button = ({ globalState, dispatch }: AddonProps) => {
  const text = "Change the story viewport.";
  const [open, setOpen] = React.useState(false);
  useHotkeys(config.hotkeys.width, () => setOpen((prev) => !prev), {
    enabled: globalState.hotkeys && config.addons.width.enabled,
  });
  const storyData = stories[globalState.story];
  let metaWidth = storyData && storyData.meta ? storyData.meta.meta.width : 0;
  let options = config.addons.width.options;
  Object.keys(options).forEach((key) => {
    if (key === metaWidth) {
      metaWidth = options[key];
    }
  });

  if (metaWidth && !Object.values(options).includes(metaWidth)) {
    options = {
      custom: metaWidth,
      ...options,
    };
  }
  return (
    <li>
      <button
        aria-label={text}
        data-testid="addon-width"
        title={text}
        onClick={() => setOpen(true)}
        className={open ? "width-active" : ""}
        type="button"
      >
        <Width />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>Set story width</label>
        <Modal
          isOpen={open}
          close={() => setOpen(false)}
          label="Dialog with the story width selector."
        >
          <p>Select 
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `width.getQuery` | function | No description |

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 0
- Features: 2

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
