# dialog.createEnumTypeChecker

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 1357-1410)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      {
        if (arguments.length > 1) {
          printWarning(
            "Invalid arguments supplied to oneOf, expected an array, got " +
              arguments.length +
              " arguments. " +
              "A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).",
          );
        } else {
          printWarning(
            "Invalid argument supplied to oneOf, expected an array.",
          );
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      const propValue = props[propName];
      for (let i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      const valuesString = JSON.stringify(
        expectedValues,
        function replacer(key, value) {
          const type = getPreciseType(value);
          if (type === "symbol") {
            return String(value);
          }
          return value;
        },
      );
      return new PropTypeError(
        "Invalid " +
          location +
          " `" +
          propFullName +
          "` of value `" +
          String(propValue) +
          "` " +
          ("supplied to `" +
            componentName +
            "`, expected one of " +
            valuesString +
            "."),
      );
    }
    return createChainableTypeChecker(validate);
  }
```

## Docstring

_No docstring provided._

## Source

```
  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      {
        if (arguments.length > 1) {
          printWarning(
            "Invalid arguments supplied to oneOf, expected an array, got " +
              arguments.length +
              " arguments. " +
              "A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).",
          );
        } else {
          printWarning(
            "Invalid argument supplied to oneOf, expected an array.",
          );
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      const propValue = props[propName];
      for (let i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      const valuesString = JSON.stringify(
        expectedValues,
        function replacer(key, value) {
          const type = getPreciseType(value);
          if (type === "symbol") {
            return String(value);
          }
          return value;
        },
      );
      return new PropTypeError(
        "Invalid " +
          location +
          " `" +
          propFullName +
          "` of value `" +
          String(propValue) +
          "` " +
          ("supplied to `" +
            componentName +
            "`, expected one of " +
            valuesString +
            "."),
      );
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
