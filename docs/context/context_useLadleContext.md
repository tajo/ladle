# context.useLadleContext

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\context.ts` (lines 11-15)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() =>
  React.useContext<{
    globalState: GlobalState;
    dispatch: React.Dispatch<GlobalAction>;
  }>(LadleContext)
```

## Docstring

_No docstring provided._

## Source

```
export const useLadleContext = () =>
  React.useContext<{
    globalState: GlobalState;
    dispatch: React.Dispatch<GlobalAction>;
  }>(LadleContext);
```

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 1
- Features: 0

## Callers

None

## Callees

None
