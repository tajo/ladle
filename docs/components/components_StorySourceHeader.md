# components.StorySourceHeader

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\provider\.ladle\components.tsx` (lines 17-25)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({ path, locStart, locEnd }) => {
  return (
    <span id="source-header">
      {config}
      {path}
      {locStart}-{locEnd}
    </span>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const StorySourceHeader: SourceHeader = ({ path, locStart, locEnd }) => {
  return (
    <span id="source-header">
      {config}
      {path}
      {locStart}-{locEnd}
    </span>
  );
};
```

## Git History

- Commits: 4
- Authors: 2
- Bug fixes: 0
- Features: 3

## Callers

None

## Callees

None
