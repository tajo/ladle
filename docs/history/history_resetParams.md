# history.resetParams

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\history.ts` (lines 11-13)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  history.push(getHref({}));
}
```

## Docstring

_No docstring provided._

## Source

```
export const resetParams = () => {
  history.push(getHref({}));
};
```

## Git History

- Commits: 9
- Authors: 2
- Bug fixes: 1
- Features: 3

## Callers

None

## Callees

None
