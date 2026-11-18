# dialog.useCallbackRef

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 1822-1847)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function useCallbackRef(initialValue, callback) {
  var ref = react.useState(function () {
    return {
      // value
      value: initialValue,
      // last callback
      callback: callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          const last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        },
      },
    };
  })[0];
  // update callback
  ref.callback = callback;
  return ref.facade;
}
```

## Docstring

_No docstring provided._

## Source

```
function useCallbackRef(initialValue, callback) {
  var ref = react.useState(function () {
    return {
      // value
      value: initialValue,
      // last callback
      callback: callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          const last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        },
      },
    };
  })[0];
  // update callback
  ref.callback = callback;
  return ref.facade;
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
