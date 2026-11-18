# storyname.stories.Cat

- **Type:** function
- **Language:** typescript
- **File:** `\packages\example\src\storyname.stories.tsx` (lines 3-8)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  const Stop = { storyName: "" };
  // should be ignored
  Stop.storyName = "What";
  return <h1>Cat</h1>;
}
```

## Docstring

_No docstring provided._

## Source

```
export const Cat: Story = () => {
  const Stop = { storyName: "" };
  // should be ignored
  Stop.storyName = "What";
  return <h1>Cat</h1>;
};
```

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Callers

None

## Callees

None
