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
        <Modal isOpen={open} close={() => setOpen(false)}>
          <p>
            Ladle is a modern playground for React components powered by
            Snowpack and a drop-in alternative to Storybook. It will be
            open-sourced soon. In meantime, you can follow my{" "}
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
