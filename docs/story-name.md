# Module: story-name

**File:** `\packages\ladle\lib\app\src\story-name.ts`

## Overview

Module `story-name` contains 8 analyzed entities.

```
import queryString from "query-string";
import type { StoryTree, StoryOrder } from "../../shared/types";

export const storyDelimiter = "-";
export const storyEncodeDelimiter = "$";

export const getQueryStory = (locationSearch: string, defaultStory: string) =>
  (queryString.parse(locationSearch).story as string) || defaultStory;

export const isQueryStorySet = (locationSearch: string) =>
  !!queryString.parse(locationSearch).story;

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const storyIdToTitle = (s: string) => {
  if (!s) return "";
  return s
    .split(`${storyDelimiter}${storyDelimiter}`)
    .reverse()
    .map((level) => capitalize(level.replace(/-/g, " ")))
    .join(" - ");
};

export const getStoryTree = (
  stories: string[],
  selectedStory: string,
  allExpanded?: boolean,
) => {
  const tree: StoryTree = [];
  const addIntoTree = (
    _tree: StoryTree,
    parts: string[],
    selectedParts: string[],
    id: string,
  ) => {
    const first = parts.shift();
    let isExpanded = allExpanded ? true : false;
    let passSelectedParts: string[] = [];
    if (selectedParts[0] === first) {
      passSelectedParts = [...selectedParts.slice(1)];
      isExpanded = true;
    }
    const itemIndex = _tree.findIndex((item) => item.subId === first);
    if (!first) return;
    if (itemIndex === -1) {
      _tree.push({
        id: `${id}${first}`,
        subId: first,
        name: capitalize(first.replace(/-/g, " ")),
        isLinkable: parts.length === 0,
        isExpanded,
        isFocused: false,
        children: [],
      });
    }
    addIntoTree(
      _tree[itemIndex > -1 ? itemIndex : _tree.length - 1].children,
      parts,
      passSelectedParts,
      `${id}${first}--`,
    );
  };
  const selectedStoryPath = selectedStory
    ? selectedStory.split(`${storyDelimiter}${storyDelimiter}`)
    : [];
  stories.forEach((story) => {
    const storyPat
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `story-name.getQueryStory` | function | No description |
| `story-name.getStoryTree` | function | No description |
| `story-name.capitalize` | function | No description |
| `story-name.isQueryStorySet` | function | No description |
| `story-name.storyIdToTitle` | function | No description |
| `story-name.addIntoTree` | function | No description |
| `story-name.storySort` | function | No description |
| `story-name.sortStories` | function | No description |

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 2

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
