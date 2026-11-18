# Module: app

**File:** `\packages\ladle\lib\app\src\app.tsx`

## Overview

Module `app` contains 2 analyzed entities.

```
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  stories as unsortedStories,
  errorMessage,
} from "virtual:generated-list";
import Story from "./story";
import NoStories from "./no-stories";
import NoStoriesError from "./no-stories-error";
import Navigation from "./sidebar/main";
import AddonPanel from "./addon-panel";
import { modifyParams, history, Action, resetParams } from "./history";
import reducer from "./reducer";
import {
  ModeState,
  GlobalState,
  ActionType,
  ControlState,
} from "../../shared/types";
import debug from "./debug";
import config from "./get-config";
import { getQuery as getQueryTheme } from "./addons/theme";
import { getQuery as getQueryMode } from "./addons/mode";
import { getQuery as getQueryRtl } from "./addons/rtl";
import { getQuery as getQuerySource } from "./addons/source";
import { getQuery as getQueryControl } from "./addons/control";
import { getQuery as getQueryWidth } from "./addons/width";
import { Context } from "./context";
import {
  getQueryStory,
  storyIdToTitle,
  isQueryStorySet,
  sortStories,
} from "./story-name";

const stories = sortStories(Object.keys(unsortedStories), config.storyOrder);
debug("Stories found", stories);

const getUrlState = (
  search: string,
  globalState?: GlobalState,
): GlobalState => ({
  theme: getQueryTheme(search),
  mode: getQueryMode(search),
  story: getQueryStory(search, config.defaultStory),
  rtl: getQueryRtl(search),
  source: getQuerySource(search),
  width: getQueryWidth(search),
  control: getQueryControl(search, globalState ? globalState.control : {}),
  action: [],
  controlInitialized: false,
  hotkeys: true,
});

const App = () => {
  const initialGlobalState = getUrlState(location.search);
  const [globalState, dispatch] = React.useReducer(reducer, initialGlobalState);
  const prevGlobalStateRef = React.useRef<Partial<GlobalState>>({});
  const [search, setSearch] = React.useState("");

  let customBackground = "";
  if (glo
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `app.getUrlState` | function | No description |
| `app.App` | function | No description |

## Git History

- Commits: 14
- Authors: 3
- Bug fixes: 2
- Features: 8

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
