# ui.Modal

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\ui.tsx` (lines 70-118)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({
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
            position: "absolute",
            insetInlineEnd: "-6px",
            top: "0px",
          }}
        >
          <Button
            onClick={() => close()}
            aria-label="Close modal"
            style={{
              height: "36px",
              width: "36px",
              borderColor: "transparent",
              boxShadow: "none",
            }}
          >
            <Close />
          </Button>
        </div>
        <div className="ladle-addon-modal-body">{children}</div>
      </DialogContent>
    </DialogOverlay>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
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
            position: "absolute",
            insetInlineEnd: "-6px",
            top: "0px",
          }}
        >
          <Button
            onClick={() => close()}
            aria-label="Close modal"
            style={{
              height: "36px",
              width: "36px",
              borderColor: "transparent",
              boxShadow: "none",
            }}
          >
            <Close />
          </Button>
        </div>
        <div className="ladle-addon-modal-body">{children}</div>
      </DialogContent>
    </DialogOverlay>
  );
};
```

## Git History

- Commits: 5
- Authors: 4
- Bug fixes: 3
- Features: 2

## Callers

None

## Callees

None
