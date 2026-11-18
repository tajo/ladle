# args-provider.actionLogger

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\args-provider.tsx` (lines 32-38)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(name: string) => (event: Event) => {
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
  const actionLogger = (name: string) => (event: Event) => {
    dispatch({
      type: ActionType.UpdateAction,
      value: { name, event },
      clear: false,
    });
  };
```

## Git History

- Commits: 18
- Authors: 4
- Bug fixes: 3
- Features: 6

## Callers

None

## Callees

None
