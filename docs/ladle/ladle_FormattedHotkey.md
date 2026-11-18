# ladle.FormattedHotkey

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\ladle.tsx` (lines 22-36)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({ children }: { children: string }) => {
  if (navigator.platform.toLowerCase().includes("mac")) {
    children = children.replace(/alt/g, "⌥ opt").replace(/meta/g, "⌘ cmd");
  } else if (navigator.platform.toLowerCase().includes("win")) {
    children = children.replace(/meta/g, "⊞ win");
  }
  children = children.replace(/shift/g, "⇧ shift");
  children = children
    .replace(/arrowright/g, "→")
    .replace(/arrowleft/g, "←")
    .replace(/arrowup/g, "↑")
    .replace(/arrowdown/g, "↓")
    .replace(/\+/g, " ＋ ");
  return <Code>{children}</Code>;
};

export const Button = ({ gl
```

## Docstring

_No docstring provided._

## Source

```
const FormattedHotkey = ({ children }: { children: string }) => {
  if (navigator.platform.toLowerCase().includes("mac")) {
    children = children.replace(/alt/g, "⌥ opt").replace(/meta/g, "⌘ cmd");
  } else if (navigator.platform.toLowerCase().includes("win")) {
    children = children.replace(/meta/g, "⊞ win");
  }
  children = children.replace(/shift/g, "⇧ shift");
  children = children
    .replace(/arrowright/g, "→")
    .replace(/arrowleft/g, "←")
    .replace(/arrowup/g, "↑")
    .replace(/arrowdown/g, "↓")
    .replace(/\+/g, " ＋ ");
  return <Code>{children}</Code>;
};
```

## Git History

- Commits: 4
- Authors: 3
- Bug fixes: 0
- Features: 2

## Callers

None

## Callees

None
