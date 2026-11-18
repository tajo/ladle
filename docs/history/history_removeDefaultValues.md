# history.removeDefaultValues

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\history.ts` (lines 15-26)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(params: Partial<GlobalState>) => {
  Object.keys(params).forEach((key) => {
    const val = params[key as keyof GlobalState];
    const defaultVal = (config.addons as any)[key]
      ? (config.addons as any)[key].defaultState
      : "$$LADLE_unknown";
    if (val === defaultVal) {
      //@ts-ignore
      delete params[key];
    }
  });
}
```

## Docstring

_No docstring provided._

## Source

```
const removeDefaultValues = (params: Partial<GlobalState>) => {
  Object.keys(params).forEach((key) => {
    const val = params[key as keyof GlobalState];
    const defaultVal = (config.addons as any)[key]
      ? (config.addons as any)[key].defaultState
      : "$$LADLE_unknown";
    if (val === defaultVal) {
      //@ts-ignore
      delete params[key];
    }
  });
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
