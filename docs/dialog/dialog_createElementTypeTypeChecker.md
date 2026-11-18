# dialog.createElementTypeTypeChecker

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 1310-1331)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      const propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        const propType = getPropType(propValue);
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type " +
            ("`" +
              propType +
              "` supplied to `" +
              componentName +
              "`, expected a single ReactElement type."),
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
```

## Docstring

_No docstring provided._

## Source

```
  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      const propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        const propType = getPropType(propValue);
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type " +
            ("`" +
              propType +
              "` supplied to `" +
              componentName +
              "`, expected a single ReactElement type."),
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
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
