# control.getInputType

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\control.tsx` (lines 16-27)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(type?: ControlType) => {
  switch (type) {
    case ControlType.Boolean:
      return "checkbox";
    case ControlType.Number:
      return "number";
    case ControlType.Range:
      return "range";
    default:
      return "text";
  }
}
```

## Docstring

_No docstring provided._

## Source

```
const getInputType = (type?: ControlType) => {
  switch (type) {
    case ControlType.Boolean:
      return "checkbox";
    case ControlType.Number:
      return "number";
    case ControlType.Range:
      return "range";
    default:
      return "text";
  }
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
