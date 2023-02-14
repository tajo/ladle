import type * as React from "react";
import { Dialog } from "./dialog";
import { Close } from "./icons";

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
    //@ts-ignore
    <Dialog
      isOpen={isOpen}
      onDismiss={() => close()}
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
    </Dialog>
  );
};
