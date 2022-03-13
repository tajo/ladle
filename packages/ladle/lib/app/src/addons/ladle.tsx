import * as React from "react";
import { Ladle } from "../icons";
import { Modal, Code } from "../ui";

export const Button: React.FC<{}> = () => {
  const [open, setOpen] = React.useState(false);
  const text = "Get more information about Ladle.";
  return (
    <li>
      <button
        aria-label={text}
        title={text}
        onClick={() => setOpen(true)}
        className={open ? "ladle-active" : ""}
      >
        <Ladle />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>About Ladle</label>
        <Modal
          isOpen={open}
          close={() => setOpen(false)}
          label="Dialog with information about Ladle."
        >
          <p>
            Ladle is a modern and very fast playground for React components
            powered by <a href="https://www.vitejs.dev/">Vite</a> and{" "}
            <a href="https://esbuild.github.io/">esbuild</a>. Contribute at{" "}
            <a href="https://github.com/tajo/ladle">GitHub</a>.
          </p>
          <p>
            <strong>Shortcuts</strong>
          </p>
          <ul>
            <li>
              <Code>/</Code> or <Code>cmd+p</Code> - search stories
            </li>
          </ul>
        </Modal>
      </button>
    </li>
  );
};
