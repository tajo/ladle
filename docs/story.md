# Module: story

**File:** `\packages\ladle\lib\app\src\story.tsx`

## Overview

Module `story` contains 1 analyzed entities.

```
import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import SynchronizeHead from "./synchronize-head";
import ErrorBoundary from "./error-boundary";
import { stories, Provider } from "virtual:generated-list";
import { Ring } from "./icons";
import type { GlobalState, GlobalAction } from "../../shared/types";
import { ActionType } from "../../shared/types";
import config from "./get-config";
import StoryNotFound from "./story-not-found";
import { ModeState } from "../../shared/types";
import { CodeHighlight } from "./addons/source";
import { Frame } from "./iframe";
import { set, reset } from "./mock-date";

const StoryFrame = ({
  children,
  active,
  width,
  story,
  mode,
}: {
  children: React.ReactElement;
  active: boolean;
  width: number;
  mode: ModeState;
  story: string;
}) => {
  if ((!active && width === 0) || mode === ModeState.Preview) return children;
  return (
    <Frame
      title={`Story ${story}`}
      initialContent={`<!DOCTYPE html><html><head><base target="_parent" /></head><body style="margin:0"><div id="root"></div></body></html>`}
      mountTarget="#root"
      className="ladle-iframe"
      style={{ width: width || "100%" }}
    >
      {children}
    </Frame>
  );
};

const StoryLoaded = ({ story }: { story: string }) => {
  React.useEffect(() => {
    document.documentElement.setAttribute("data-storyloaded", "");
    return () => document.documentElement.removeAttribute("data-storyloaded");
  }, [story]);
  return null;
};

const Story = ({
  globalState,
  dispatch,
}: {
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}) => {
  const storyData = stories[globalState.story];
  const width = globalState.width;
  const storyDataMeta = storyData?.meta?.meta;
  const hotkeys = storyDataMeta ? storyDataMeta.hotkeys : true;
  const mockDate = storyDataMeta ? storyDataMeta.mockDate : undefined;

  const iframeActive: boolean =
    storyData && storyDataMeta ? storyDataMeta.iframed : false;
  let
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `story.StoryFrame` | function | No description |

## Git History

- Commits: 13
- Authors: 4
- Bug fixes: 5
- Features: 5

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
