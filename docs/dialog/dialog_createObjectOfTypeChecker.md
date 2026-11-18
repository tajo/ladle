# dialog.createObjectOfTypeChecker

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 1412-1457)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== "function") {
        return new PropTypeError(
          "Property `" +
            propFullName +
            "` of component `" +
            componentName +
            "` has invalid PropType notation inside objectOf.",
        );
      }
      const propValue = props[propName];
      const propType = getPropType(propValue);
      if (propType !== "object") {
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
              "`, expected an object."),
        );
      }
      for (const key in propValue) {
        if (has(propValue, key)) {
          const error = typeChecker(
            propValue,
            key,
            componentName,
            location,
            propFullName + "." + key,
            ReactPropTypesSecret_1,
          );
          if (error instanceof Error) {
            return error;
          }
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
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== "function") {
        return new PropTypeError(
          "Property `" +
            propFullName +
            "` of component `" +
            componentName +
            "` has invalid PropType notation inside objectOf.",
        );
      }
      const propValue = props[propName];
      const propType = getPropType(propValue);
      if (propType !== "object") {
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
              "`, expected an object."),
        );
      }
      for (const key in propValue) {
        if (has(propValue, key)) {
          const error = typeChecker(
            propValue,
            key,
            componentName,
            location,
            propFullName + "." + key,
            ReactPropTypesSecret_1,
          );
          if (error instanceof Error) {
            return error;
          }
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
