# Module: addon-panel

**File:** `\packages\ladle\lib\app\src\addon-panel.tsx`

## Overview

Module `addon-panel` contains 0 analyzed entities.

```
import * as React from "react";
import type { Config, GlobalState, GlobalAction } from "../../shared/types";
import { Button as ThemeButton } from "./addons/theme";
import { Button as ControlButton } from "./addons/control";
import { Button as ModeButton } from "./addons/mode";
import { Button as ActionButton } from "./addons/action";
import { Button as RtlButton } from "./addons/rtl";
import { Button as SourceButton } from "./addons/source";
import { Button as LadleButton } from "./addons/ladle";
import { Button as A11yButton } from "./addons/a11y";
import { Button as WidthButton } from "./addons/width";
import config from "./get-config";

type AddonNames = keyof Config["addons"];

const AddonPanel = ({
  globalState,
  dispatch,
}: {
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}) => {
  if (
    Object.keys(config.addons).every(
      (addonName) => config.addons[addonName as AddonNames].enabled === false,
    )
  ) {
    return null;
  }
  return (
    <header role="banner" className="ladle-addons">
      <ul>
        {config.addons.control.enabled &&
          Object.keys(globalState.control).length > 0 && (
            <ControlButton globalState={globalState} dispatch={dispatch} />
          )}
        {config.addons.theme.enabled && (
          <ThemeButton globalState={globalState} dispatch={dispatch} />
        )}
        {config.addons.mode.enabled && (
          <ModeButton globalState={globalState} dispatch={dispatch} />
        )}
        {config.addons.width.enabled && (
          <WidthButton globalState={globalState} dispatch={dispatch} />
        )}
        {config.addons.rtl.enabled && (
          <RtlButton globalState={globalState} dispatch={dispatch} />
        )}
        {config.addons.source.enabled && (
          <SourceButton globalState={globalState} dispatch={dispatch} />
        )}
        {config.addons.a11y.enabled && (
          <A11yButton globalState={globalState} dispatch={dispatch} />
        )}
        {co
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 1
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
