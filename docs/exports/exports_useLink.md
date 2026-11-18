# exports.useLink

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\exports.ts` (lines 35-38)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  const { dispatch } = useLadleContext();
  return (value: string) => dispatch({ type: ActionType.UpdateStory, value });
}
```

## Docstring

_No docstring provided._

## Source

```
export const useLink = () => {
  const { dispatch } = useLadleContext();
  return (value: string) => dispatch({ type: ActionType.UpdateStory, value });
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
