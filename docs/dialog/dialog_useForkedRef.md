# dialog.useForkedRef

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 486-510)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function useForkedRef() {
  for (
    var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0;
    _key4 < _len4;
    _key4++
  ) {
    refs[_key4] = arguments[_key4];
  }

  return react.useMemo(function () {
    if (
      refs.every(function (ref) {
        return ref == null;
      })
    ) {
      return null;
    }

    return function (node) {
      refs.forEach(function (ref) {
        assignRef$1(ref, node);
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [].concat(refs));
}
```

## Docstring

_No docstring provided._

## Source

```
function useForkedRef() {
  for (
    var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0;
    _key4 < _len4;
    _key4++
  ) {
    refs[_key4] = arguments[_key4];
  }

  return react.useMemo(function () {
    if (
      refs.every(function (ref) {
        return ref == null;
      })
    ) {
      return null;
    }

    return function (node) {
      refs.forEach(function (ref) {
        assignRef$1(ref, node);
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [].concat(refs));
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
