# dialog.createInstanceTypeChecker

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 1333-1355)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        const expectedClassName = expectedClass.name || ANONYMOUS;
        const actualClassName = getClassName(props[propName]);
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type " +
            ("`" +
              actualClassName +
              "` supplied to `" +
              componentName +
              "`, expected ") +
            ("instance of `" + expectedClassName + "`."),
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
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        const expectedClassName = expectedClass.name || ANONYMOUS;
        const actualClassName = getClassName(props[propName]);
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type " +
            ("`" +
              actualClassName +
              "` supplied to `" +
              componentName +
              "`, expected ") +
            ("instance of `" + expectedClassName + "`."),
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
