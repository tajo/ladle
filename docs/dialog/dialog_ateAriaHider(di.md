# dialog.ateAriaHider(di

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 4228-4282)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction createAriaHider(dialogNode) {
  const originalValues = [];
  const rootNodes = [];
  const ownerDocument = getOwnerDocument(dialogNode);

  if (!dialogNode) {
    {
      console.warn(
        "A ref has not yet been attached to a dialog node when attempting to call `createAriaHider`.",
      );
    }

    return noop;
  }

  Array.prototype.forEach.call(
    ownerDocument.querySelectorAll("body > *"),
    function (node) {
      let _dialogNode$parentNod, _dialogNode$parentNod2;

      const portalNode =
        (_dialogNode$parentNod = dialogNode.parentNode) == null
          ? void 0
          : (_dialogNode$parentNod2 = _dialogNode$parentNod.parentNode) == null
            ? void 0
            : _dialogNode$parentNod2.parentNode;

      if (node === portalNode) {
        return;
      }

      const attr = node.getAttribute("aria-hidden");
      const alreadyHidden = attr !== null && attr !== "false";

      if (alreadyHidden) {
        return;
      }

      originalValues.push(attr);
      rootNodes.push(node);
      node.setAttribute("aria-hidden", "true");
    },
  );
  return function () {
    rootNodes.forEach(function (node, index) {
      const originalValue = originalValues[index];

      if (originalValue === null) {
        node.removeAttribute("aria-hidden");
      } else {
        node.setAttribute("aria-hidden", originalValue);
      }
    });
  };
}

f
```

## Docstring

_No docstring provided._

## Source

```
function createAriaHider(dialogNode) {
  const originalValues = [];
  const rootNodes = [];
  const ownerDocument = getOwnerDocument(dialogNode);

  if (!dialogNode) {
    {
      console.warn(
        "A ref has not yet been attached to a dialog node when attempting to call `createAriaHider`.",
      );
    }

    return noop;
  }

  Array.prototype.forEach.call(
    ownerDocument.querySelectorAll("body > *"),
    function (node) {
      let _dialogNode$parentNod, _dialogNode$parentNod2;

      const portalNode =
        (_dialogNode$parentNod = dialogNode.parentNode) == null
          ? void 0
          : (_dialogNode$parentNod2 = _dialogNode$parentNod.parentNode) == null
            ? void 0
            : _dialogNode$parentNod2.parentNode;

      if (node === portalNode) {
        return;
      }

      const attr = node.getAttribute("aria-hidden");
      const alreadyHidden = attr !== null && attr !== "false";

      if (alreadyHidden) {
        return;
      }

      originalValues.push(attr);
      rootNodes.push(node);
      node.setAttribute("aria-hidden", "true");
    },
  );
  return function () {
    rootNodes.forEach(function (node, index) {
      const originalValue = originalValues[index];

      if (originalValue === null) {
        node.removeAttribute("aria-hidden");
      } else {
        node.setAttribute("aria-hidden", originalValue);
      }
    });
  };
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
