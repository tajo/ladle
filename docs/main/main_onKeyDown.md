# main.onKeyDown

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\sidebar\main.tsx` (lines 97-103)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(e) => {
    if (e.key === "ArrowDown" && treeRoot.current?.firstChild) {
      const firstLiElement = treeRoot.current.firstChild as HTMLLIElement;

      firstLiElement.focus();
    }
  }
```

## Docstring

_No docstring provided._

## Source

```
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "ArrowDown" && treeRoot.current?.firstChild) {
      const firstLiElement = treeRoot.current.firstChild as HTMLLIElement;

      firstLiElement.focus();
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
