# synchronize-head.SynchronizeHead

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\synchronize-head.tsx` (lines 32-122)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({
  active,
  children,
  rtl,
  width,
}: {
  active: boolean;
  children: React.ReactNode;
  rtl: boolean;
  width: number;
}) => {
  const { window: storyWindow, document: iframeDocument } = useFrame();
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

  React.useEffect(() => {
    const originalInsertRule = window.CSSStyleSheet.prototype.insertRule;
    const originalDeleteRule = window.CSSStyleSheet.prototype.deleteRule;

    window.CSSStyleSheet.prototype.insertRule = function (rule, index) {
      const retVal = addStyleElement(rule, document, index);
      if (active && iframeDocument) {
        return addStyleElement(rule, iframeDocument, index);
      }
      return retVal;
    };

    window.CSSStyleSheet.prototype.deleteRule = function (index) {
      deleteStyleElement(document, index);
      if (active && iframeDocument) {
        deleteStyleElement(iframeDocument, index);
      }
    };

    return () => {
      window.CSSStyleSheet.prototype.insertRule = originalInsertRule;
      window.CSSStyleSheet.prototype.deleteRule = originalDeleteRule;
    };
  }, []);

  React.useEffect(() => {
    if (active) {
      syncHead();
      iframeDocument?.addEventListener("keydown", redirectKeydown);
      iframeDocument?.addEventListener("keyup", redirectKeyup);
      const observer = new MutationObserver(() => syncHead());
      document.documentElement.setAttribute("data-iframed", `${width}`);
      observer.observe(document.head, {
        subtree: true,
        characterData: true,
        childList: true,
      });
      return () => {
        observer && observer.disconnect();
        iframeDocument?.removeEventListener("keydown", redirectKeydown);
        iframeDocument?.removeEventListener("keyup", redirectKeyup);
      };
    }
    return;
  }, [active, rtl, iframeDocument]);
  return children;
}
```

## Docstring

_No docstring provided._

## Source

```
const SynchronizeHead = ({
  active,
  children,
  rtl,
  width,
}: {
  active: boolean;
  children: React.ReactNode;
  rtl: boolean;
  width: number;
}) => {
  const { window: storyWindow, document: iframeDocument } = useFrame();
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

  React.useEffect(() => {
    const originalInsertRule = window.CSSStyleSheet.prototype.insertRule;
    const originalDeleteRule = window.CSSStyleSheet.prototype.deleteRule;

    window.CSSStyleSheet.prototype.insertRule = function (rule, index) {
      const retVal = addStyleElement(rule, document, index);
      if (active && iframeDocument) {
        return addStyleElement(rule, iframeDocument, index);
      }
      return retVal;
    };

    window.CSSStyleSheet.prototype.deleteRule = function (index) {
      deleteStyleElement(document, index);
      if (active && iframeDocument) {
        deleteStyleElement(iframeDocument, index);
      }
    };

    return () => {
      window.CSSStyleSheet.prototype.insertRule = originalInsertRule;
      window.CSSStyleSheet.prototype.deleteRule = originalDeleteRule;
    };
  }, []);

  React.useEffect(() => {
    if (active) {
      syncHead();
      iframeDocument?.addEventListener("keydown", redirectKeydown);
      iframeDocument?.addEventListener("keyup", redirectKeyup);
      const observer = new MutationObserver(() => syncHead());
      document.documentElement.setAttribute("data-iframed", `${width}`);
      observer.observe(document.head, {
        subtree: true,
        characterData: true,
        childList: true,
      });
      return () => {
        observer && observer.disconnect();
        iframeDocument?.removeEventListener("keydown", redirectKeydown);
        iframeDocument?.removeEventListener("keyup", redirectKeyup);
      };
    }
    return;
  }, [active, rtl, iframeDocument]);
  return children;
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
