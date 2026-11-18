# control.getInputValue

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\control.tsx` (lines 29-39)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(target: HTMLInputElement, type?: ControlType) => {
  switch (type) {
    case ControlType.Boolean:
      return target.checked;
    case ControlType.Number:
    case ControlType.Range:
      return parseFloat(target.value);
    default:
      return target.value;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
const getInputValue = (target: HTMLInputElement, type?: ControlType) => {
  switch (type) {
    case ControlType.Boolean:
      return target.checked;
    case ControlType.Number:
    case ControlType.Range:
      return parseFloat(target.value);
    default:
      return target.value;
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
