# control.coerceString

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\control.tsx` (lines 41-47)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(value: string, options?: any[]) => {
  if (options && options.some((option) => option === Number(value))) {
    return Number(value);
  }
  const isBoolean = value === "true" || value === "false";
  return isBoolean ? (value === "false" ? false : true) : value;
}
```

## Docstring

_No docstring provided._

## Source

```
const coerceString = (value: string, options?: any[]) => {
  if (options && options.some((option) => option === Number(value))) {
    return Number(value);
  }
  const isBoolean = value === "true" || value === "false";
  return isBoolean ? (value === "false" ? false : true) : value;
};
```

## Git History

- Commits: 14
- Authors: 5
- Bug fixes: 1
- Features: 7

## Callers

None

## Callees

None
