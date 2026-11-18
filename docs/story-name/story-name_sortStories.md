# story-name.sortStories

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\story-name.ts` (lines 100-125)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(stories: string[], storyOrder: StoryOrder) => {
  const initialSort = stories.sort(storySort);
  const configSort = Array.isArray(storyOrder)
    ? storyOrder
    : storyOrder(initialSort);
  const finalSort = new Set<string>();
  configSort.forEach((storyOrig) => {
    const story = storyOrig.toLowerCase();
    if (story.includes("*")) {
      const prefix = story.split("*")[0];
      initialSort.forEach((s) => {
        if (s.startsWith(prefix)) {
          finalSort.add(s);
        }
      });
    } else {
      if (!initialSort.includes(story)) {
        throw new Error(
          `Story "${storyOrig}" does not exist in your storybook. Please check your storyOrder config.`,
        );
      }
      finalSort.add(story);
    }
  });
  return [...finalSort];
}
```

## Docstring

_No docstring provided._

## Source

```
export const sortStories = (stories: string[], storyOrder: StoryOrder) => {
  const initialSort = stories.sort(storySort);
  const configSort = Array.isArray(storyOrder)
    ? storyOrder
    : storyOrder(initialSort);
  const finalSort = new Set<string>();
  configSort.forEach((storyOrig) => {
    const story = storyOrig.toLowerCase();
    if (story.includes("*")) {
      const prefix = story.split("*")[0];
      initialSort.forEach((s) => {
        if (s.startsWith(prefix)) {
          finalSort.add(s);
        }
      });
    } else {
      if (!initialSort.includes(story)) {
        throw new Error(
          `Story "${storyOrig}" does not exist in your storybook. Please check your storyOrder config.`,
        );
      }
      finalSort.add(story);
    }
  });
  return [...finalSort];
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
