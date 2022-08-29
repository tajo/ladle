import * as React from "react";
import { Inspector, chromeLight, chromeDark } from "react-inspector";
import { Action } from "../icons";
import { Modal } from "../ui";
import { ActionType, AddonProps, ThemeState } from "../../../shared/types";

export const Button = ({ dispatch, globalState }: AddonProps) => {
  const [open, setOpen] = React.useState(false);
  const text = "Log of events triggered by user.";
  return (
    <li>
      <button
        aria-label={text}
        title={text}
        onClick={() => setOpen(true)}
        className={open ? "ladle-active" : ""}
        data-testid="addon-action"
      >
        <Action />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>Actions</label>
        {globalState.action.length ? (
          <div className="ladle-badge">{globalState.action.length}</div>
        ) : null}
        <Modal
          maxWidth="60em"
          isOpen={open}
          close={() => setOpen(false)}
          label="Dialog with a log of events triggered by user."
        >
          {globalState.action.map((action: any, index: number) => (
            <Inspector
              table={false}
              key={index}
              sortObjectKeys
              theme={
                {
                  ...(globalState.theme === ThemeState.Light
                    ? chromeLight
                    : chromeDark),
                  BASE_BACKGROUND_COLOR: "var(--ladle-bg-color-secondary)",
                } as any
              }
              showNonenumerable={false}
              name={action.name}
              data={action.event}
            />
          ))}

          <button
            onClick={() => {
              dispatch({
                type: ActionType.UpdateAction,
                clear: true,
                value: undefined,
              });
            }}
          >
            Clear actions
          </button>
        </Modal>
      </button>
    </li>
  );
};
