# exports.action

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\exports.ts` (lines 46-55)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(name: string) => {
  const dispatch = (window as any)
    .ladleDispatch as React.Dispatch<GlobalAction>;
  return (event: any = undefined) =>
    dispatch({
      type: ActionType.UpdateAction,
      value: { name, event },
      clear: false,
    });
}
```

## Docstring

_No docstring provided._

## Source

```
export const action = (name: string) => {
  const dispatch = (window as any)
    .ladleDispatch as React.Dispatch<GlobalAction>;
  return (event: any = undefined) =>
    dispatch({
      type: ActionType.UpdateAction,
      value: { name, event },
      clear: false,
    });
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
