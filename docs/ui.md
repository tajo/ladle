# Module: ui

**File:** `\packages\ladle\lib\app\src\ui.tsx`

## Overview

Module `ui` contains 6 analyzed entities.

```
import * as React from "react";
import {
  DialogOverlay as RawDialogOverlay,
  DialogContent as RawDialogContent,
} from "./dialog";
import { Close } from "./icons";

// Type definitions for the dialog components from the bundled @reach/dialog
interface DialogOverlayProps {
  isOpen?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
  "data-testid"?: string;
}

interface DialogContentProps {
  "aria-label"?: string;
  "data-testid"?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DialogOverlay = RawDialogOverlay as React.FC<DialogOverlayProps>;
const DialogContent = RawDialogContent as React.FC<DialogContentProps>;

export const Button = ({
  children,
  onClick,
  style,
  ...rest
}: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  "aria-label"?: string;
}) => {
  return (
    <button
      className="ladle-button"
      onClick={onClick}
      style={style}
      aria-label={rest["aria-label"]}
      type="button"
    >
      {children}
    </button>
  );
};

export const Link = ({
  children,
  href,
  style,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <a className="ladle-link" href={href} style={style}>
      {children}
    </a>
  );
};

export const Code = ({ children }: { children: React.ReactNode }) => {
  return <code className="ladle-code">{children}</code>;
};

export const Modal = ({
  children,
  close,
  isOpen,
  label,
  maxWidth = "40em",
}: {
  children: React.ReactNode;
  close: () => void;
  isOpen: boolean;
  label?: string;
  maxWidth?: string;
}) => {
  return (
    <DialogOverlay
      isOpen={isOpen}
      onDismiss={() => close()}
      data-testid="ladle-dialog-overlay"
    >
      <DialogContent
        aria-label={label || "Modal"}
        data-testid="ladle-dialog"
        style={{ maxWidth }}
      >
        <div
          style={{
            position: "absolut
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `ui.Button` | function | No description |
| `ui.Modal` | function | No description |
| `ui.Code` | function | No description |
| `ui.Link` | function | No description |
| `ui.DialogOverlayProps` | interface | No description |
| `ui.DialogContentProps` | interface | No description |

## Git History

- Commits: 5
- Authors: 4
- Bug fixes: 3
- Features: 2

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
