# dialog.dleClick(ev

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 4045-4050)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction handleClick(event) {
      if (mouseDownTarget.current === event.target) {
        event.stopPropagation();
        onDismiss(event);
      }
    }

 
```

## Docstring

_No docstring provided._

## Source

```
    function handleClick(event) {
      if (mouseDownTarget.current === event.target) {
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
