# tree-view.hotkeyStoryTransition

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\tree-view.tsx` (lines 64-70)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(story?: string) => {
    if (story) {
      updateStory(story);
      setTree(getStoryTree(stories, story, allExpanded));
      setTimeout(() => focusSelectedItem(story), 1);
    }
  }
```

## Docstring

_No docstring provided._

## Source

```
  const hotkeyStoryTransition = (story?: string) => {
    if (story) {
      updateStory(story);
      setTree(getStoryTree(stories, story, allExpanded));
      setTimeout(() => focusSelectedItem(story), 1);
    }
  };
```

## Git History

- Commits: 8
- Authors: 3
- Bug fixes: 0
- Features: 3

## Callers

None

## Callees

None
