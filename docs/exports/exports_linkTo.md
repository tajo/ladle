# exports.linkTo

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\exports.ts` (lines 40-44)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(value: string) => {
  const dispatch = (window as any)
    .ladleDispatch as React.Dispatch<GlobalAction>;
  return () => dispatch({ type: ActionType.UpdateStory, value });
}
```

## Docstring

_No docstring provided._

## Source

```
export const linkTo = (value: string) => {
  const dispatch = (window as any)
    .ladleDispatch as React.Dispatch<GlobalAction>;
  return () => dispatch({ type: ActionType.UpdateStory, value });
};
```

## Git History

- Commits: 28
- Authors: 8
- Bug fixes: 2
- Features: 17

## Callers

None

## Callees

None
