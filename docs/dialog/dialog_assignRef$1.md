# dialog.assignRef$1

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 383-397)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function assignRef$1(ref, value) {
  if (ref == null) return;

  if (isFunction(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(
        'Cannot assign value "' + value + '" to ref "' + ref + '"',
      );
    }
  }
}
```

## Docstring

_No docstring provided._

## Source

```
function assignRef$1(ref, value) {
  if (ref == null) return;

  if (isFunction(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(
        'Cannot assign value "' + value + '" to ref "' + ref + '"',
      );
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
