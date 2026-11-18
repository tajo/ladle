# Module: source

**File:** `\packages\ladle\lib\app\src\addons\source.tsx`

## Overview

Module `source` contains 1 analyzed entities.

```
import type { Language } from "prism-react-renderer";
import { Highlight } from "prism-react-renderer";
import queryString from "query-string";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  stories,
  storySource,
  StorySourceHeader,
} from "virtual:generated-list";
import { ActionType, AddonProps, GlobalState } from "../../../shared/types";
import config from "../get-config";
import { Source } from "../icons";
import { Modal } from "../ui";

export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).source;
  if (urlVal === "true") return true;
  if (urlVal === "false") return false;
  return config.addons.source.defaultState;
};

export const CodeHighlight = ({
  children,
  theme,
  language = "tsx",
  locStart,
  locEnd,
  className,
}: {
  children: string;
  theme: string;
  language?: Language;
  locStart?: number;
  locEnd?: number;
  className?: string;
}) => {
  const withLoc =
    typeof locStart !== "undefined" && typeof locEnd !== "undefined";
  const match = /language-(\w+)/.exec(className || "");

  if (match) {
    language = match[1] as Language;

    return (
      <Highlight
        code={children.trim()}
        language={language}
        theme={
          theme === "dark"
            ? config.addons.source.themeDark
            : config.addons.source.themeLight
        }
      >
        {({ className, style, tokens, getTokenProps }) => (
          <div
            className={className}
            style={{
              ...style,
              textAlign: "left",
              margin: "0.5em 0 1em 0",
              padding: "1em",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </div>
        )}
      </Highlight>
    );
  }

  if (wi
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `source.getQuery` | function | No description |

## Git History

- Commits: 9
- Authors: 4
- Bug fixes: 1
- Features: 5

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
