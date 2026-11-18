# dialog.createElementTypeChecker

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 1287-1308)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      const propValue = props[propName];
      if (!isValidElement(propValue)) {
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
              "`, expected a single ReactElement."),
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
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      const propValue = props[propName];
      if (!isValidElement(propValue)) {
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
              "`, expected a single ReactElement."),
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
