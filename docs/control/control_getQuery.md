# control.getQuery

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\control.tsx` (lines 49-112)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(
  locationSearch: string,
  controlState: ControlState,
) => {
  const params = queryString.parse(locationSearch);
  const controls: { [key: string]: any } = {};
  // we first need controls being initialized from stories so we know types
  // before taking over from url
  if (Object.keys(controlState).length === 0) {
    return controlState;
  }
  Object.keys(params).forEach((paramKey) => {
    if (paramKey.startsWith("arg-") && controlState[paramKey.split("-")[1]]) {
      const keyParts = paramKey.split("-");
      const argKey = keyParts[1];
      const argValue = params[paramKey] as string;
      const argType = controlState[argKey].type;
      if (argType !== ControlType.Action) {
        let realValue: any = argValue;
        switch (argType) {
          case ControlType.String:
            realValue = decodeURI(argValue);
            break;
          case ControlType.Boolean:
            realValue = argValue === "true";
            break;
          case ControlType.Range:
            realValue = parseFloat(argValue);
            break;
          case ControlType.Number:
            realValue = parseInt(argValue, 10);
            break;
          case ControlType.Complex:
            realValue = JSON.parse(decodeURI(argValue));
            break;
          case ControlType.Radio:
          case ControlType.InlineRadio:
          case ControlType.Select:
          case ControlType.Background:
            realValue = coerceString(
              decodeURI(argValue),
              controlState[argKey].options,
            );
            break;
          case ControlType.InlineCheck:
          case ControlType.MultiSelect:
          case ControlType.Check:
            realValue = coerceString(
              JSON.parse(decodeURI(argValue)),
              controlState[argKey].options,
            );
            break;
        }
        controls[argKey] = {
          value: realValue,
          defaultValue: controlState[argKey].defaultValue,
          description: controlState[argKey].description,
          type: controlState[argKey].type,
        };
      }
    }
  });
  return controls;
}
```

## Docstring

_No docstring provided._

## Source

```
export const getQuery = (
  locationSearch: string,
  controlState: ControlState,
) => {
  const params = queryString.parse(locationSearch);
  const controls: { [key: string]: any } = {};
  // we first need controls being initialized from stories so we know types
  // before taking over from url
  if (Object.keys(controlState).length === 0) {
    return controlState;
  }
  Object.keys(params).forEach((paramKey) => {
    if (paramKey.startsWith("arg-") && controlState[paramKey.split("-")[1]]) {
      const keyParts = paramKey.split("-");
      const argKey = keyParts[1];
      const argValue = params[paramKey] as string;
      const argType = controlState[argKey].type;
      if (argType !== ControlType.Action) {
        let realValue: any = argValue;
        switch (argType) {
          case ControlType.String:
            realValue = decodeURI(argValue);
            break;
          case ControlType.Boolean:
            realValue = argValue === "true";
            break;
          case ControlType.Range:
            realValue = parseFloat(argValue);
            break;
          case ControlType.Number:
            realValue = parseInt(argValue, 10);
            break;
          case ControlType.Complex:
            realValue = JSON.parse(decodeURI(argValue));
            break;
          case ControlType.Radio:
          case ControlType.InlineRadio:
          case ControlType.Select:
          case ControlType.Background:
            realValue = coerceString(
              decodeURI(argValue),
              controlState[argKey].options,
            );
            break;
          case ControlType.InlineCheck:
          case ControlType.MultiSelect:
          case ControlType.Check:
            realValue = coerceString(
              JSON.parse(decodeURI(argValue)),
              controlState[argKey].options,
            );
            break;
        }
        controls[argKey] = {
          value: realValue,
          defaultValue: controlState[argKey].defaultValue,
          description: controlState[argKey].description,
          type: controlState[argKey].type,
        };
      }
    }
  });
  return controls;
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
