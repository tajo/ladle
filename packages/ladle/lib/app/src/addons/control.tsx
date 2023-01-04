import * as React from "react";
import { Controls } from "../icons";
import { Modal } from "../ui";
import queryString from "query-string";
import type { AddonProps } from "../../../shared/types";
import {
  ActionType,
  ControlType,
  GlobalState,
  GlobalAction,
  ControlState,
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
            value: parseInt(params[paramKey] as string, 10),
            defaultValue: undefined,
            description: "",
            type: ControlType.Number,
          };
          break;
        case "c":
          try {
            controls[keyParts.slice(2).join("-")] = {
              value: JSON.parse(decodeURI(params[paramKey] as string)),
              defaultValue: undefined,
              description: "",
              type: ControlType.Complex,
            };
          } catch (e) {}
          break;
        case "r":
          controls[keyParts.slice(2).join("-")] = {
            value: params[paramKey],
            defaultValue: params[paramKey],
            description: "",
            options: [params[paramKey]],
            type: ControlType.Radio,
          };
          break;
        case "l":
          controls[keyParts.slice(2).join("-")] = {
            value: params[paramKey],
            defaultValue: params[paramKey],
            description: "",
            options: [params[paramKey]],
            type: ControlType.Select,
          };
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

const Control = ({
  controlKey,
  globalState,
  dispatch,
}: {
  controlKey: string;
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}) => {
  if (globalState.control[controlKey].type === ControlType.Action) {
    return (
      <tr>
        <td>{controlKey}</td>
        <td>action</td>
      </tr>
    );
  }
  if (globalState.control[controlKey].type === ControlType.Function) {
    return (
      <tr>
        <td>{controlKey}</td>
        <td>function</td>
      </tr>
    );
  }
  if (globalState.control[controlKey].type === ControlType.Radio) {
    return (
      <tr>
        <td>{controlKey}</td>
        <td>
          {(globalState.control[controlKey].options || []).map((option) => {
            const optionString = String(option);
            return (
              <span key={optionString + controlKey}>
                <input
                  id={`${controlKey}-${option}`}
                  type="radio"
                  name={controlKey}
                  value={option}
                  onChange={(e) => {
                    dispatch({
                      type: ActionType.UpdateControl,
                      value: {
                        ...globalState.control,
                        [controlKey]: {
                          ...globalState.control[controlKey],
                          value: e.target.value || undefined,
                        },
                      },
                    });
                  }}
                  checked={globalState.control[controlKey].value === option}
                />
                <label htmlFor={`${controlKey}-${option}`}>
                  {optionString}
                </label>
              </span>
            );
          })}
        </td>
      </tr>
    );
  }
  if (globalState.control[controlKey].type === ControlType.Select) {
    return (
      <tr>
        <td>
          <label htmlFor={controlKey}>{controlKey}</label>
        </td>
        <td>
          <select
            id={controlKey}
            value={globalState.control[controlKey].value}
            onChange={(e) => {
              dispatch({
                type: ActionType.UpdateControl,
                value: {
                  ...globalState.control,
                  [controlKey]: {
                    ...globalState.control[controlKey],
                    value: e.target.value,
                  },
                },
              });
            }}
          >
            {(globalState.control[controlKey].options || []).map((option) => {
              const optionString = String(option);
              return (
                <option key={optionString + controlKey} value={option}>
                  {optionString}
                </option>
              );
            })}
          </select>
        </td>
      </tr>
    );
  }
  if (globalState.control[controlKey].type === ControlType.Complex) {
    let stringValue = "";
    try {
      stringValue = JSON.stringify(globalState.control[controlKey].value);
    } catch (e) {
      stringValue = "Object/Array argument must be serializable.";
    }
    return (
      <tr>
        <td>
          <label htmlFor={controlKey}>{controlKey}</label>
        </td>
        <td>
          <textarea
            id={controlKey}
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
        </td>
      </tr>
    );
  }
  return (
    <tr>
      <td>
        <label htmlFor={controlKey}>{controlKey}</label>
      </td>
      <td>
        <input
          id={controlKey}
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
      </td>
    </tr>
  );
};

export const Button = ({ globalState, dispatch }: AddonProps) => {
  const [open, setOpen] = React.useState(false);
  const text = "Explore different versions of this story through controls.";
  const activeControls = Object.keys(globalState.control).filter(
    (key) =>
      JSON.stringify(globalState.control[key].value) !==
      JSON.stringify(globalState.control[key].defaultValue),
  );
  return (
    <li>
      <button
        aria-label={text}
        title={text}
        onClick={() => setOpen(true)}
        className={open ? "ladle-active" : ""}
        data-testid="addon-control"
      >
        <Controls />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>Story Controls</label>
        {activeControls.length ? (
          <div className="ladle-badge">{activeControls.length}</div>
        ) : null}
        <Modal
          isOpen={open}
          close={() => setOpen(false)}
          label="Toggle different controls to update the story."
        >
          <table className="ladle-controls-table">
            <tbody>
              {Object.keys(globalState.control)
                .sort()
                .map((controlKey) => {
                  return (
                    <Control
                      key={controlKey}
                      globalState={globalState}
                      dispatch={dispatch}
                      controlKey={controlKey}
                    />
                  );
                })}
            </tbody>
          </table>
          <button
            onClick={() => {
              const controls: ControlState = {};
              Object.keys(globalState.control).forEach((control) => {
                controls[control] = {
                  ...globalState.control[control],
                  value: globalState.control[control].defaultValue,
                };
              });
              dispatch({
                type: ActionType.UpdateControl,
                value: controls,
              });
            }}
          >
            Reset to defaults
          </button>
        </Modal>
      </button>
    </li>
  );
};
