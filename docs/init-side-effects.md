# Module: init-side-effects

**File:** `\packages\ladle\lib\app\src\init-side-effects.ts`

## Overview

Module `init-side-effects` contains 0 analyzed entities.

```
// a separate non-react script, to ensure this is executed asap
import debug from "./debug";
import { storyIdToTitle, getQueryStory } from "./story-name";
import config from "./get-config";
import { getQuery as getQueryTheme } from "./addons/theme";
import { ThemeState } from "../../shared/types";

const title = storyIdToTitle(
  getQueryStory(location.search, config.defaultStory),
);
debug(`Initial document.title: ${title}`);
document.title = `${title} | Ladle`;

const theme = getQueryTheme(location.search);
debug(`Initial theme state: ${theme}`);

if (theme === ThemeState.Auto) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", ThemeState.Dark);
  } else {
    document.documentElement.setAttribute("data-theme", ThemeState.Light);
  }
} else {
  document.documentElement.setAttribute("data-theme", theme);
}
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| _none_ | — | — |

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
