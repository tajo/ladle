# dialog.getPostfixForTypeWarning

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 1730-1743)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function getPostfixForTypeWarning(value) {
    const type = getPreciseType(value);
    switch (type) {
      case "array":
      case "object":
        return "an " + type;
      case "boolean":
      case "date":
      case "regexp":
        return "a " + type;
      default:
        return type;
    }
  }
```

## Docstring

_No docstring provided._

## Source

```
  function getPostfixForTypeWarning(value) {
    const type = getPreciseType(value);
    switch (type) {
      case "array":
      case "object":
        return "an " + type;
      case "boolean":
      case "date":
      case "regexp":
        return "a " + type;
      default:
        return type;
    }
  }
```

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
