import { useState } from "react";
import { Ladle } from "../icons";
import { Modal, Code } from "../ui";

export const Button: React.FC<{}> = () => {
  const [open, setOpen] = useState(false);
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
            <a href="https://esbuild.github.io/">esbuild</a>. It will be
            open-sourced soon. In meantime, you can follow{" "}
            <a href="https://twitter.com/vmiksu">twitter</a> for more updates.
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
