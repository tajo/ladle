import * as React from "react";
import { Controls } from "../icons";
import { Modal } from "../ui";
import queryString from "../../deps/query-string";
import type { AddonProps } from "../../../shared/types";
import {
  ActionType,
  ControlType,
  GlobalState,
  GlobalAction,
} from "../../../shared/types";

const getInputType = (type?: ControlType) => {
  switch (type) {
    case ControlType.Boolean:
      return "checkbox";
    case ControlType.Number:
      return "number";
    default:
      return "text";
  }
};

const getInputValue = (target: HTMLInputElement, type?: ControlType) => {
  switch (type) {
    case ControlType.Boolean:
      return target.checked;
    case ControlType.Number:
      return parseInt(target.value, 10);
    default:
      return target.value;
  }
};

export const getQuery = (locationSearch: string) => {
  const params = queryString.parse(locationSearch);
  const controls: { [key: string]: any } = {};
  Object.keys(params).forEach((paramKey) => {
    if (paramKey.startsWith("arg-")) {
      const keyParts = paramKey.split("-");
      switch (keyParts[1]) {
        case "b":
          controls[keyParts.slice(2).join("-")] = {
            value: params[paramKey] === "true",
            defaultValue: undefined,
            description: "",
            type: ControlType.Boolean,
          };
          break;
        case "n":
          controls[keyParts.slice(2).join("-")] = {
            value: parseInt(params[paramKey], 10),
            defaultValue: undefined,
            description: "",
            type: ControlType.Number,
          };
          break;
        case "c":
          try {
            controls[keyParts.slice(2).join("-")] = {
              value: JSON.parse(decodeURI(params[paramKey])),
              defaultValue: undefined,
              description: "",
              type: ControlType.Complex,
            };
          } catch (e) {}
          break;
        default:
          controls[keyParts.slice(2).join("-")] = {
            value: params[paramKey],
            defaultValue: undefined,
            description: "",
            type: ControlType.String,
          };
      }
    }
  });
  return controls;
};

const Control: React.FC<{
  controlKey: string;
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}> = ({ controlKey, globalState, dispatch }) => {
  if (globalState.control[controlKey].type === ControlType.Function) {
    return <p>{controlKey}: function</p>;
  }
  if (globalState.control[controlKey].type === ControlType.Complex) {
    let stringValue = "";
    try {
      stringValue = JSON.stringify(globalState.control[controlKey].value);
    } catch (e) {
      stringValue = "Object/Array argument must be serializable.";
    }
    return (
      <>
        <p>{controlKey}</p>
        <p>
          <textarea
            defaultValue={stringValue}
            onChange={(e) => {
              let value = globalState.control[controlKey].value;
              try {
                value = JSON.parse(e.target.value);
              } catch (e) {}
              dispatch({
                type: ActionType.UpdateControl,
                value: {
                  ...globalState.control,
                  [controlKey]: {
                    ...globalState.control[controlKey],
                    value,
                  },
                },
              });
            }}
          />
        </p>
      </>
    );
  }
  return (
    <p>
      {controlKey}
      <input
        type={getInputType(globalState.control[controlKey].type)}
        value={globalState.control[controlKey].value}
        checked={
          globalState.control[controlKey].type === ControlType.Boolean &&
          globalState.control[controlKey].value === true
        }
        onChange={(e) =>
          dispatch({
            type: ActionType.UpdateControl,
            value: {
              ...globalState.control,
              [controlKey]: {
                ...globalState.control[controlKey],
                value: getInputValue(
                  e.target,
                  globalState.control[controlKey].type,
                ),
              },
            },
          })
        }
      />
    </p>
  );
};

export const Button: React.FC<AddonProps> = ({ globalState, dispatch }) => {
  const [open, setOpen] = React.useState(false);
  const text = "Explore different versions of this story through controls.";
  return (
    <li>
      <button
        aria-label={text}
        title={text}
        onClick={() => setOpen(true)}
        className={open ? "ladle-active" : ""}
      >
        <Controls />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>Story Controls</label>
        <Modal
          isOpen={open}
          close={() => setOpen(false)}
          label="Toggle different controls to update the story."
        >
          {Object.keys(globalState.control).map((controlKey) => {
            return (
              <Control
                key={controlKey}
                globalState={globalState}
                dispatch={dispatch}
                controlKey={controlKey}
              />
            );
          })}
        </Modal>
      </button>
    </li>
  );
};
