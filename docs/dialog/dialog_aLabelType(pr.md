# dialog.aLabelType(pr

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 4284-4319)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction ariaLabelType(props, propName, compName, location, propFullName) {
  const details =
    "\nSee https://www.w3.org/TR/wai-aria/#aria-label for details.";

  if (!props["aria-label"] && !props["aria-labelledby"]) {
    return new Error(
      "A <" +
        compName +
        "> must have either an `aria-label` or `aria-labelledby` prop.\n      " +
        details,
    );
  }

  if (props["aria-label"] && props["aria-labelledby"]) {
    return new Error(
      "You provided both `aria-label` and `aria-labelledby` props to a <" +
        compName +
        ">. If the a label for this component is visible on the screen, that label's component should be given a unique ID prop, and that ID should be passed as the `aria-labelledby` prop into <" +
        compName +
        ">. If the label cannot be determined programmatically from the content of the element, an alternative label should be provided as the `aria-label` prop, which will be used as an `aria-label` on the HTML tag." +
        details,
    );
  } else if (props[propName] != null && !isString(props[propName])) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to `" +
        compName +
        "`. Expected `string`, received `" +
        (Array.isArray(propFullName) ? "array" : typeof propFullName) +
        "`.",
    );
  }

  return null;
} ////////////////////////////////////////////////////////////////////////////////

e
```

## Docstring

_No docstring provided._

## Source

```
function ariaLabelType(props, propName, compName, location, propFullName) {
  const details =
    "\nSee https://www.w3.org/TR/wai-aria/#aria-label for details.";

  if (!props["aria-label"] && !props["aria-labelledby"]) {
    return new Error(
      "A <" +
        compName +
        "> must have either an `aria-label` or `aria-labelledby` prop.\n      " +
        details,
    );
  }

  if (props["aria-label"] && props["aria-labelledby"]) {
    return new Error(
      "You provided both `aria-label` and `aria-labelledby` props to a <" +
        compName +
        ">. If the a label for this component is visible on the screen, that label's component should be given a unique ID prop, and that ID should be passed as the `aria-labelledby` prop into <" +
        compName +
        ">. If the label cannot be determined programmatically from the content of the element, an alternative label should be provided as the `aria-label` prop, which will be used as an `aria-label` on the HTML tag." +
        details,
    );
  } else if (props[propName] != null && !isString(props[propName])) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to `" +
        compName +
        "`. Expected `string`, received `" +
        (Array.isArray(propFullName) ? "array" : typeof propFullName) +
        "`.",
    );
  }

  return null;
} ////////////////////////////////////////////////////////////////////////////////
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
