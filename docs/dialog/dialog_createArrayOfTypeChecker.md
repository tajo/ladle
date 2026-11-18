# dialog.createArrayOfTypeChecker

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 1242-1285)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== "function") {
        return new PropTypeError(
          "Property `" +
            propFullName +
            "` of component `" +
            componentName +
            "` has invalid PropType notation inside arrayOf.",
        );
      }
      const propValue = props[propName];
      if (!Array.isArray(propValue)) {
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
              "`, expected an array."),
        );
      }
      for (let i = 0; i < propValue.length; i++) {
        const error = typeChecker(
          propValue,
          i,
          componentName,
          location,
          propFullName + "[" + i + "]",
          ReactPropTypesSecret_1,
        );
        if (error instanceof Error) {
          return error;
        }
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
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== "function") {
        return new PropTypeError(
          "Property `" +
            propFullName +
            "` of component `" +
            componentName +
            "` has invalid PropType notation inside arrayOf.",
        );
      }
      const propValue = props[propName];
      if (!Array.isArray(propValue)) {
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
              "`, expected an array."),
        );
      }
      for (let i = 0; i < propValue.length; i++) {
        const error = typeChecker(
          propValue,
          i,
          componentName,
          location,
          propFullName + "[" + i + "]",
          ReactPropTypesSecret_1,
        );
        if (error instanceof Error) {
          return error;
        }
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
