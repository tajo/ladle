# story-name.getStoryTree

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\story-name.ts` (lines 27-75)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(
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
    const storyPath = story.split(`${storyDelimiter}${storyDelimiter}`);
    addIntoTree(tree, storyPath, selectedStoryPath, "");
  });

  return tree;
}
```

## Docstring

_No docstring provided._

## Source

```
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
    const storyPath = story.split(`${storyDelimiter}${storyDelimiter}`);
    addIntoTree(tree, storyPath, selectedStoryPath, "");
  });

  return tree;
};
```

## Git History

- Commits: 4
- Authors: 1
- Bug fixes: 0
- Features: 2

## Callers

None

## Callees

None
