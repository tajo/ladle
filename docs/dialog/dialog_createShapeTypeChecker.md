# dialog.createShapeTypeChecker

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 1528-1564)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      const propValue = props[propName];
      const propType = getPropType(propValue);
      if (propType !== "object") {
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type `" +
            propType +
            "` " +
            ("supplied to `" + componentName + "`, expected `object`."),
        );
      }
      for (const key in shapeTypes) {
        const checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        const error = checker(
          propValue,
          key,
          componentName,
          location,
          propFullName + "." + key,
          ReactPropTypesSecret_1,
        );
        if (error) {
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
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      const propValue = props[propName];
      const propType = getPropType(propValue);
      if (propType !== "object") {
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type `" +
            propType +
            "` " +
            ("supplied to `" + componentName + "`, expected `object`."),
        );
      }
      for (const key in shapeTypes) {
        const checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        const error = checker(
          propValue,
          key,
          componentName,
          location,
          propFullName + "." + key,
          ReactPropTypesSecret_1,
        );
        if (error) {
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
