# Module: ladle

**File:** `\packages\ladle\lib\app\src\addons\ladle.tsx`

## Overview

Module `ladle` contains 1 analyzed entities.

```
import * as React from "react";
import { Ladle } from "../icons";
import { Modal, Code } from "../ui";
import config from "../get-config";
import type { AddonProps } from "../../../shared/types";

const hotkeyLegends = {
  fullscreen: "Toggle fullscreen mode",
  search: "Focus search input in the sidebar",
  nextStory: "Go to the next story",
  previousStory: "Go to the previous story",
  nextComponent: "Go to the next component",
  previousComponent: "Go to the previous component",
  control: "Toggle controls addon",
  darkMode: "Toggle dark mode",
  width: "Toggle width addon",
  rtl: "Toggle right-to-left mode",
  a11y: "Toggle accessibility addon",
  source: "Toggle story source addon",
};

const FormattedHotkey = ({ children }: { children: string }) => {
  if (navigator.platform.toLowerCase().includes("mac")) {
    children = children.replace(/alt/g, "⌥ opt").replace(/meta/g, "⌘ cmd");
  } else if (navigator.platform.toLowerCase().includes("win")) {
    children = children.replace(/meta/g, "⊞ win");
  }
  children = children.replace(/shift/g, "⇧ shift");
  children = children
    .replace(/arrowright/g, "→")
    .replace(/arrowleft/g, "←")
    .replace(/arrowup/g, "↑")
    .replace(/arrowdown/g, "↓")
    .replace(/\+/g, " ＋ ");
  return <Code>{children}</Code>;
};

export const Button = ({ globalState }: AddonProps) => {
  const [open, setOpen] = React.useState(false);
  const text = "Get more information about Ladle.";
  return (
    <li>
      <button
        aria-label={text}
        title={text}
        onClick={() => setOpen(true)}
        className={open ? "ladle-active" : ""}
        type="button"
      >
        <Ladle />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>About Ladle</label>
        <Modal
          isOpen={open}
          close={() => setOpen(false)}
          label="Dialog with information about Ladle."
        >
          <h3>Hotkeys</h3>
          {globalState.hotkeys ? (
            <>
              <ul styl
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `ladle.FormattedHotkey` | function | No description |

## Git History

- Commits: 4
- Authors: 3
- Bug fixes: 0
- Features: 2

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
