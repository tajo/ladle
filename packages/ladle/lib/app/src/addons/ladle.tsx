import * as React from "react";
import { Ladle } from "../icons";
import { Modal, Code } from "../ui";
import config from "../get-config";
import type { AddonProps } from "../../../shared/types";

const hotkeyLegends = {
  fullscreen: "Toggle fullscreen mode",
  search: "Focus search input in the sidebar",
  nextStory: "Go to the next story",
  previousStory: "Go to the previous story",
  nextComponent: "Go to the next component",
  previousComponent: "Go to the previous component",
  control: "Toggle controls addon",
  darkMode: "Toggle dark mode",
  width: "Toggle width addon",
  rtl: "Toggle right-to-left mode",
  a11y: "Toggle accessibility addon",
  source: "Toggle story source addon",
};

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

export const Button = ({ globalState }: AddonProps) => {
  const [open, setOpen] = React.useState(false);
  const text = "Get more information about Ladle.";
  return (
    <li>
      <button
        aria-label={text}
        title={text}
        onClick={() => setOpen(true)}
        className={open ? "ladle-active" : ""}
        type="button"
      >
        <Ladle />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>About Ladle</label>
        <Modal
          isOpen={open}
          close={() => setOpen(false)}
          label="Dialog with information about Ladle."
        >
          <h3>Hotkeys</h3>
          {globalState.hotkeys ? (
            <>
              <ul style={{ listStyle: "none", marginLeft: 0, paddingLeft: 0 }}>
                {Object.keys(config.hotkeys).map((action) =>
                  (config.hotkeys as any)[action].length ? (
                    <li key={action}>
                      <span
                        style={{
                          display: "inline-block",
                          width: "200px",
                        }}
                      >
                        {(config.hotkeys as any)[action].map(
                          (hotkey: string, i: number) => (
                            <span key={hotkey}>
                              <FormattedHotkey>{hotkey}</FormattedHotkey>
                              {(config.hotkeys as any)[action].length > i + 1
                                ? " or "
                                : ""}
                            </span>
                          ),
                        )}
                      </span>
                      <span style={{ display: "inline-block" }}>
                        {hotkeyLegends[action as keyof typeof hotkeyLegends]}
                      </span>
                    </li>
                  ) : null,
                )}
              </ul>
              <p>
                Hotkeys can be disabled through{" "}
                <Code>{`Story.meta = { hotkeys: false }`}</Code>.
              </p>
            </>
          ) : (
            <p>
              Hotkeys are disabled for this story by{" "}
              <Code>meta.hotkeys = false</Code>.
            </p>
          )}
          <p>
            Ladle is a modern and fast playground for React components powered
            by Vite. For more information visit{" "}
            <a href="https://www.ladle.dev/">ladle.dev</a> or our{" "}
            <a href="https://discord.gg/H6FSHjyW7e">discord</a>.
          </p>
        </Modal>
      </button>
    </li>
  );
};
