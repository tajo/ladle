# story-hmr.storyUpdated

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\story-hmr.ts` (lines 4-6)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  watchers.forEach((watcher) => watcher());
}
```

## Docstring

_No docstring provided._

## Source

```
export const storyUpdated = () => {
  watchers.forEach((watcher) => watcher());
};
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
