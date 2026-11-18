# synchronize-head.syncHead

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\synchronize-head.tsx` (lines 44-74)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
    if (!storyWindow) return;
    storyWindow.document.documentElement.setAttribute(
      "dir",
      rtl ? "rtl" : "ltr",
    );
    [...(document.head.children as any)].forEach((child) => {
      if (
        child.tagName === "STYLE" ||
        (child.tagName === "LINK" &&
          (child.getAttribute("type") === "text/css" ||
            child.getAttribute("rel") === "stylesheet"))
      ) {
        const exists = [...(storyWindow.document.head.children as any)].some(
          (el) => {
            if (el.tagName === "LINK") {
              return el.getAttribute("href") === child.getAttribute("href");
            }
            if (el.tagName === "STYLE") {
              return el.innerHTML === child.innerHTML;
            }
            return false;
          },
        );
        if (exists) return;
        storyWindow.document.head.appendChild(
          child.cloneNode(true),
        ) as HTMLStyleElement;
      }
    });
  }
```

## Docstring

_No docstring provided._

## Source

```
  const syncHead = () => {
    if (!storyWindow) return;
    storyWindow.document.documentElement.setAttribute(
      "dir",
      rtl ? "rtl" : "ltr",
    );
    [...(document.head.children as any)].forEach((child) => {
      if (
        child.tagName === "STYLE" ||
        (child.tagName === "LINK" &&
          (child.getAttribute("type") === "text/css" ||
            child.getAttribute("rel") === "stylesheet"))
      ) {
        const exists = [...(storyWindow.document.head.children as any)].some(
          (el) => {
            if (el.tagName === "LINK") {
              return el.getAttribute("href") === child.getAttribute("href");
            }
            if (el.tagName === "STYLE") {
              return el.innerHTML === child.innerHTML;
            }
            return false;
          },
        );
        if (exists) return;
        storyWindow.document.head.appendChild(
          child.cloneNode(true),
        ) as HTMLStyleElement;
      }
    });
  };
```

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 0
- Features: 1

## Callers

None

## Callees

None
