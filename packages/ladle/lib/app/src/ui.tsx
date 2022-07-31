import * as React from "react";
import { Dialog } from "@reach/dialog";
import { Close } from "./icons";
import cx from "classnames";

export const Button: React.FC<{
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  className?: string;
}> = ({ children, onClick, style, className }) => {
  return (
    <button
      className={cx("ladle-button", className)}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export const Link: React.FC<{
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, href, style }) => {
  return (
    <a className="ladle-link" href={href} style={style}>
      {children}
    </a>
  );
};

export const Code: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <code className="ladle-code">{children}</code>;
};

export const Modal: React.FC<{
  children: React.ReactNode;
  close: () => void;
  title?: React.ReactNode;
  nav?: React.ReactNode;
  isOpen: boolean;
  label?: string;
}> = ({ children, title, nav, close, isOpen, label }) => (
  <Dialog
    isOpen={isOpen}
    onDismiss={() => close()}
    aria-label={label || "Modal"}
    data-ladle
  >
    {title && (
      <header className="ladle-modal-header">
        <h4 className="ladle-modal-heading">{title}</h4>
        {nav}
      </header>
    )}
    <Button
      onClick={() => close()}
      aria-label="Close modal"
      className="ladle-modal-close-button"
    >
      <Close />
    </Button>
    {children}
  </Dialog>
);
