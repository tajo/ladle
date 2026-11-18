# dialog.createUnionTypeChecker

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 1459-1509)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning(
        "Invalid argument supplied to oneOfType, expected an instance of array.",
      );
      return emptyFunctionThatReturnsNull;
    }

    for (let i = 0; i < arrayOfTypeCheckers.length; i++) {
      const checker = arrayOfTypeCheckers[i];
      if (typeof checker !== "function") {
        printWarning(
          "Invalid argument supplied to oneOfType. Expected an array of check functions, but " +
            "received " +
            getPostfixForTypeWarning(checker) +
            " at index " +
            i +
            ".",
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (let i = 0; i < arrayOfTypeCheckers.length; i++) {
        const checker = arrayOfTypeCheckers[i];
        if (
          checker(
            props,
            propName,
            componentName,
            location,
            propFullName,
            ReactPropTypesSecret_1,
          ) == null
        ) {
          return null;
        }
      }

      return new PropTypeError(
        "Invalid " +
          location +
          " `" +
          propFullName +
          "` supplied to " +
          ("`" + componentName + "`."),
      );
    }
    return createChainableTypeChecker(validate);
  }
```

## Docstring

_No docstring provided._

## Source

```
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning(
        "Invalid argument supplied to oneOfType, expected an instance of array.",
      );
      return emptyFunctionThatReturnsNull;
    }

    for (let i = 0; i < arrayOfTypeCheckers.length; i++) {
      const checker = arrayOfTypeCheckers[i];
      if (typeof checker !== "function") {
        printWarning(
          "Invalid argument supplied to oneOfType. Expected an array of check functions, but " +
            "received " +
            getPostfixForTypeWarning(checker) +
            " at index " +
            i +
            ".",
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (let i = 0; i < arrayOfTypeCheckers.length; i++) {
        const checker = arrayOfTypeCheckers[i];
        if (
          checker(
            props,
            propName,
            componentName,
            location,
            propFullName,
            ReactPropTypesSecret_1,
          ) == null
        ) {
          return null;
        }
      }

      return new PropTypeError(
        "Invalid " +
          location +
          " `" +
          propFullName +
          "` supplied to " +
          ("`" + componentName + "`."),
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
