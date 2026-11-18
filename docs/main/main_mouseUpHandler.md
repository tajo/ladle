# main.mouseUpHandler

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\main.tsx` (lines 71-76)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
      if (resizeActive) {
        document.body.style.cursor = "auto";
        setResizeActive(false);
      }
    }
```

## Docstring

_No docstring provided._

## Source

```
    const mouseUpHandler = () => {
      if (resizeActive) {
        document.body.style.cursor = "auto";
        setResizeActive(false);
      }
    };
```

## Git History

- Commits: 5
- Authors: 3
- Bug fixes: 0
- Features: 3

## Callers

None

## Callees

None
