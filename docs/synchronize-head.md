# Module: synchronize-head

**File:** `\packages\ladle\lib\app\src\synchronize-head.tsx`

## Overview

Module `synchronize-head` contains 4 analyzed entities.

```
// detecting parent's document.head changes, so we can apply the same CSS for
// the iframe, for CSS in JS using CSSStyleSheet API we transform it into
// style tags and append them to the iframe's document.head
// also re-fire hotkeys events from iframe to parent

import * as React from "react";
import { useFrame } from "./iframe";
import { redirectKeyup, redirectKeydown } from "./redirect-events";
const CSS_ATTR = "data-debug-css";

function addStyleElement(rule: string, doc: Document, index?: number): number {
  const existingTags = doc.head.querySelectorAll(`style[${CSS_ATTR}]`);
  const tag = doc.createElement("style");
  tag.setAttribute(CSS_ATTR, "true");
  tag.appendChild(doc.createTextNode(rule));
  if (index && existingTags[index]) {
    existingTags[index].after(tag);
    return index + 1;
  } else {
    doc.head.appendChild(tag);
    return existingTags.length;
  }
}

function deleteStyleElement(doc: Document, index?: number) {
  const existingTags = doc.head.querySelectorAll(`style[${CSS_ATTR}]`);
  if (index != undefined && existingTags[index]) {
    existingTags[index].remove();
  }
}

const SynchronizeHead = ({
  active,
  children,
  rtl,
  width,
}: {
  active: boolean;
  children: React.ReactNode;
  rtl: boolean;
  width: number;
}) => {
  const { window: storyWindow, document: iframeDocument } = useFrame();
  const syncHead = () => {
    if (!storyWindow) return;
    storyWindow.document.documentElement.setAttribute(
      "dir",
      rtl ? "rtl" : "ltr",
    );
    [...(document.head.children as any)].forEach((child) => {
      if (
        child.tagName === "STYLE" ||
        (child.tagName === "LINK" &&
          (child.getAttribute("type") === "text/css" ||
            child.getAttribute("rel") === "stylesheet"))
      ) {
        const exists = [...(storyWindow.document.head.children as any)].some(
          (el) => {
            if (el.tagName === "LINK") {
              return el.getAttribute("href") === child.getAttribute("href");
      
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `synchronize-head.addStyleElement` | function | No description |
| `synchronize-head.deleteStyleElement` | function | No description |
| `synchronize-head.SynchronizeHead` | function | No description |
| `synchronize-head.syncHead` | function | No description |

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 0
- Features: 1

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
