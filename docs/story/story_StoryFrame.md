# story.StoryFrame

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\story.tsx` (lines 16-32)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({
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
```

## Docstring

_No docstring provided._

## Source

```
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
```

## Git History

- Commits: 13
- Authors: 4
- Bug fixes: 5
- Features: 5

## Callers

None

## Callees

None
