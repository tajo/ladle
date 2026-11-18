# history.getHref

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\history.ts` (lines 54-85)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(params: Partial<GlobalState>) => {
  removeDefaultValues(params);
  const encodedParams: { [key: string]: any } = {};
  Object.keys(params).forEach((key: string) => {
    if (key === "control") {
      // for controls we are spreading individual args into URL
      Object.keys(params[key] as any).forEach((argKey) => {
        const arg = (params[key] as any)[argKey];
        if (arg.type === ControlType.Action) {
          // a special case, actions are handled by the addon-action
          return;
        }
        const value = encodeURI(
          typeof arg.value === "string" ? arg.value : JSON.stringify(arg.value),
        );
        try {
          const isValueDefault =
            JSON.stringify(arg.value) === JSON.stringify(arg.defaultValue);
          if (
            !isValueDefault &&
            JSON.stringify(value) !== JSON.stringify(arg.defaultValue)
          ) {
            encodedParams[`arg-${argKey}`] = value;
          }
        } catch (e) {}
      });
    } else {
      encodedParams[key] = (params as any)[key];
    }
  });
  return `?${queryString.stringify(encodedParams)}`;
}
```

## Docstring

_No docstring provided._

## Source

```
export const getHref = (params: Partial<GlobalState>) => {
  removeDefaultValues(params);
  const encodedParams: { [key: string]: any } = {};
  Object.keys(params).forEach((key: string) => {
    if (key === "control") {
      // for controls we are spreading individual args into URL
      Object.keys(params[key] as any).forEach((argKey) => {
        const arg = (params[key] as any)[argKey];
        if (arg.type === ControlType.Action) {
          // a special case, actions are handled by the addon-action
          return;
        }
        const value = encodeURI(
          typeof arg.value === "string" ? arg.value : JSON.stringify(arg.value),
        );
        try {
          const isValueDefault =
            JSON.stringify(arg.value) === JSON.stringify(arg.defaultValue);
          if (
            !isValueDefault &&
            JSON.stringify(value) !== JSON.stringify(arg.defaultValue)
          ) {
            encodedParams[`arg-${argKey}`] = value;
          }
        } catch (e) {}
      });
    } else {
      encodedParams[key] = (params as any)[key];
    }
  });
  return `?${queryString.stringify(encodedParams)}`;
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
