# Module: main

**File:** `\packages\ladle\lib\app\src\sidebar\main.tsx`

## Overview

Module `main` contains 3 analyzed entities.

```
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import cx from "classnames";
import config from "../get-config";
import TreeView from "./tree-view";
import { debounce } from "./utils";
import { getSettings, updateSettings } from "../local-storage";
import type { UpdateStory } from "../../../shared/types";

const DEFAULT_WIDTH = 240;
const MIN_WIDTH = 192;
const MAX_WIDTH = 920;

const debouncedUpdateSettings = debounce(updateSettings, 250);

const Main = ({
  stories,
  story,
  updateStory,
  hotkeys,
  search,
  setSearch,
}: {
  stories: string[];
  story: string;
  updateStory: UpdateStory;
  hotkeys: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [width, setWidth] = React.useState(
    getSettings().sidebarWidth || DEFAULT_WIDTH,
  );
  const [resizeActive, setResizeActive] = React.useState(false);
  const handleRef = React.useRef<HTMLDivElement>(null);
  const searchEl = React.useRef<HTMLInputElement>(null);
  const treeRoot = React.useRef<HTMLUListElement | null>(null);

  React.useEffect(() => {
    const parentStyles = window.getComputedStyle(
      // @ts-ignore
      handleRef.current.parentElement,
    );
    const direction = parentStyles.getPropertyValue("flex-direction");
    if (direction === "row-reverse") {
      document.documentElement.setAttribute("data-reversed", "");
    }
  }, []);

  React.useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!resizeActive) {
        return;
      }
      setWidth((previousWidth) => {
        const newWidth = document.documentElement.hasAttribute("data-reversed")
          ? previousWidth + e.movementX
          : previousWidth - e.movementX;
        if (newWidth < MIN_WIDTH) {
          debouncedUpdateSettings({ sidebarWidth: MIN_WIDTH });
          return MIN_WIDTH;
        }
        if (newWidth > MAX_WIDTH) {
          debouncedUpdateSettings({ sidebarWidth: MAX_WIDTH });
          return MAX_W
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `main.mouseMoveHandler` | function | No description |
| `main.onKeyDown` | function | No description |
| `main.mouseUpHandler` | function | No description |

## Git History

- Commits: 5
- Authors: 3
- Bug fixes: 0
- Features: 3

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
