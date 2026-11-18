# main.mouseMoveHandler

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\main.tsx` (lines 51-70)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(e: MouseEvent) => {
      if (!resizeActive) {
        return;
      }
      setWidth((previousWidth) => {
        const newWidth = document.documentElement.hasAttribute("data-reversed")
          ? previousWidth + e.movementX
          : previousWidth - e.movementX;
        if (newWidth < MIN_WIDTH) {
          debouncedUpdateSettings({ sidebarWidth: MIN_WIDTH });
          return MIN_WIDTH;
        }
        if (newWidth > MAX_WIDTH) {
          debouncedUpdateSettings({ sidebarWidth: MAX_WIDTH });
          return MAX_WIDTH;
        }
        debouncedUpdateSettings({ sidebarWidth: newWidth });
        return newWidth;
      });
    }
```

## Docstring

_No docstring provided._

## Source

```
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!resizeActive) {
        return;
      }
      setWidth((previousWidth) => {
        const newWidth = document.documentElement.hasAttribute("data-reversed")
          ? previousWidth + e.movementX
          : previousWidth - e.movementX;
        if (newWidth < MIN_WIDTH) {
          debouncedUpdateSettings({ sidebarWidth: MIN_WIDTH });
          return MIN_WIDTH;
        }
        if (newWidth > MAX_WIDTH) {
          debouncedUpdateSettings({ sidebarWidth: MAX_WIDTH });
          return MAX_WIDTH;
        }
        debouncedUpdateSettings({ sidebarWidth: newWidth });
        return newWidth;
      });
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
