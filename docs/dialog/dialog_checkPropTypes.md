# dialog.checkPropTypes

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 875-946)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (const typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== "function") {
            const err = Error(
              (componentName || "React class") +
                ": " +
                location +
                " type `" +
                typeSpecName +
                "` is invalid; " +
                "it must be a function, usually from the `prop-types` package, but received `" +
                typeof typeSpecs[typeSpecName] +
                "`.",
            );
            err.name = "Invariant Violation";
            throw err;
          }
          error = typeSpecs[typeSpecName](
            values,
            typeSpecName,
            componentName,
            location,
            null,
            ReactPropTypesSecret,
          );
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || "React class") +
              ": type specification of " +
              location +
              " `" +
              typeSpecName +
              "` is invalid; the type checker " +
              "function must return `null` or an `Error` but returned a " +
              typeof error +
              ". " +
              "You may have forgotten to pass an argument to the type checker " +
              "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
              "shape all require an argument).",
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          const stack = getStack ? getStack() : "";

          printWarning$1(
            "Failed " +
              location +
              " type: " +
              error.message +
              (stack != null ? stack : ""),
          );
        }
      }
    }
  }
}
```

## Docstring

_No docstring provided._

## Source

```
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (const typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== "function") {
            const err = Error(
              (componentName || "React class") +
                ": " +
                location +
                " type `" +
                typeSpecName +
                "` is invalid; " +
                "it must be a function, usually from the `prop-types` package, but received `" +
                typeof typeSpecs[typeSpecName] +
                "`.",
            );
            err.name = "Invariant Violation";
            throw err;
          }
          error = typeSpecs[typeSpecName](
            values,
            typeSpecName,
            componentName,
            location,
            null,
            ReactPropTypesSecret,
          );
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || "React class") +
              ": type specification of " +
              location +
              " `" +
              typeSpecName +
              "` is invalid; the type checker " +
              "function must return `null` or an `Error` but returned a " +
              typeof error +
              ". " +
              "You may have forgotten to pass an argument to the type checker " +
              "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
              "shape all require an argument).",
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          const stack = getStack ? getStack() : "";

          printWarning$1(
            "Failed " +
              location +
              " type: " +
              error.message +
              (stack != null ? stack : ""),
          );
        }
      }
    }
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
