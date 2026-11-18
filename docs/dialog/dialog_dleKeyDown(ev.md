# dialog.dleKeyDown(ev

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 4052-4057)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction handleKeyDown(event) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onDismiss(event);
      }
    }

 
```

## Docstring

_No docstring provided._

## Source

```
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onDismiss(event);
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
