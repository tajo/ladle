# context.Context

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\addons\src\context.tsx` (lines 4-6)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function Context() {
  const { globalState } = useLadleContext();
  return <div id="context-div">{JSON.stringify(globalState)}
```

## Docstring

_No docstring provided._

## Source

```
function Context() {
  const { globalState } = useLadleContext();
  return <div id="context-div">{JSON.stringify(globalState)}</div>;
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 1
- Features: 0

## Callers

None

## Callees

None
