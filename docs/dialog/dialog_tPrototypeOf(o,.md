# dialog.tPrototypeOf(o,

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 2282-2291)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

f
```

## Docstring

_No docstring provided._

## Source

```
function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
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
