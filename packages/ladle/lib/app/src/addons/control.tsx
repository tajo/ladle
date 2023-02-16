import * as React from "react";
import { Controls } from "../icons";
import { Modal } from "../ui";
import queryString from "query-string";
import type { AddonProps } from "../../../shared/types";
import {
  ActionType,
  ControlState,
  ControlType,
  GlobalAction,
  GlobalState,
} from "../../../shared/types";

const getInputType = (type?: ControlType) => {
  switch (type) {
    case ControlType.Boolean:
      return "checkbox";
    case ControlType.Number:
      return "number";
    case ControlType.Range:
      return "range";
    default:
      return "text";
  }
};

const getInputValue = (target: HTMLInputElement, type?: ControlType) => {
  switch (type) {
    case ControlType.Boolean:
      return target.checked;
    case ControlType.Number:
    case ControlType.Range:
      return parseFloat(target.value);
    default:
      return target.value;
  }
};

const coerceString = (value: string) => {
  const isBoolean = value === "true" || value === "false";
  return isBoolean ? (value === "false" ? false : true) : value;
};

export const getQuery = (
  locationSearch: string,
  controlState: ControlState,
) => {
  const params = queryString.parse(locationSearch);
  const controls: { [key: string]: any } = {};
  // we first need controls being initialized from stories so we know types
  // before taking over from url
  if (Object.keys(controlState).length === 0) {
    return controlState;
  }
  Object.keys(params).forEach((paramKey) => {
    if (paramKey.startsWith("arg-") && controlState[paramKey.split("-")[1]]) {
      const keyParts = paramKey.split("-");
      const argKey = keyParts[1];
      const argValue = params[paramKey] as string;
      const argType = controlState[argKey].type;
      if (argType !== ControlType.Action) {
        let realValue: any = argValue;
        switch (argType) {
          case ControlType.String:
            realValue = decodeURI(argValue);
            break;
          case ControlType.Boolean:
            realValue = argValue === "true";
            break;
          case ControlType.Range:
            realValue = parseFloat(argValue);
            break;
          case ControlType.Number:
            realValue = parseInt(argValue, 10);
            break;
          case ControlType.Complex:
            realValue = JSON.parse(decodeURI(argValue));
            break;
          case ControlType.Radio:
          case ControlType.InlineRadio:
          case ControlType.Select:
            realValue = coerceString(decodeURI(argValue));
            break;
          case ControlType.InlineCheck:
          case ControlType.MultiSelect:
          case ControlType.Check:
            realValue = coerceString(JSON.parse(decodeURI(argValue)));
            break;
        }
        controls[argKey] = {
          value: realValue,
          defaultValue: controlState[argKey].defaultValue,
          description: controlState[argKey].description,
          type: controlState[argKey].type,
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
  const controlState = globalState.control[controlKey];

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
  if (
    globalState.control[controlKey].type === ControlType.Radio ||
    globalState.control[controlKey].type === ControlType.InlineRadio
  ) {
    return (
      <tr>
        <td>{controlKey}</td>
        <td
          style={
            globalState.control[controlKey].type === ControlType.InlineRadio
              ? { display: "flex" }
              : {}
          }
        >
          {(globalState.control[controlKey].options || []).map((option) => {
            const value = globalState.control[controlKey].value;
            const isChecked = value === option || value === String(option);
            return (
              <div
                key={`${String(option)}-${controlKey}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  ...(globalState.control[controlKey].type ===
                  ControlType.InlineRadio
                    ? { paddingRight: "0.5em" }
                    : {}),
                }}
              >
                <input
                  id={`${controlKey}-${String(option)}`}
                  type="radio"
                  name={controlKey}
                  value={String(option)}
                  onChange={(e) => {
                    dispatch({
                      type: ActionType.UpdateControl,
                      value: {
                        ...globalState.control,
                        [controlKey]: {
                          ...globalState.control[controlKey],
                          value: coerceString(e.target.value),
                        },
                      },
                    });
                  }}
                  checked={isChecked}
                />
                <label htmlFor={`${controlKey}-${String(option)}`}>
                  {String(option)}
                </label>
              </div>
            );
          })}
        </td>
      </tr>
    );
  }
  if (
    globalState.control[controlKey].type === ControlType.Check ||
    globalState.control[controlKey].type === ControlType.InlineCheck ||
    globalState.control[controlKey].type === ControlType.MultiSelect
  ) {
    return (
      <tr>
        <td>{controlKey}</td>
        <td
          style={
            globalState.control[controlKey].type === ControlType.InlineCheck
              ? { display: "flex" }
              : {}
          }
        >
          {(globalState.control[controlKey].options || []).map((option) => {
            const value = new Set(globalState.control[controlKey].value);
            return (
              <div
                key={`${String(option)}-${controlKey}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  ...(globalState.control[controlKey].type ===
                  ControlType.InlineCheck
                    ? { paddingRight: "0.5em" }
                    : {}),
                }}
              >
                <input
                  id={`${controlKey}-${String(option)}`}
                  type="checkbox"
                  name={`${controlKey}-${String(option)}`}
                  value={String(option)}
                  checked={value.has(String(option))}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (value.has(newValue)) {
                      value.delete(newValue);
                    } else {
                      value.add(newValue);
                    }
                    dispatch({
                      type: ActionType.UpdateControl,
                      value: {
                        ...globalState.control,
                        [controlKey]: {
                          ...globalState.control[controlKey],
                          value: value.size > 0 ? Array.from(value) : undefined,
                        },
                      },
                    });
                  }}
                />
                <label
                  htmlFor={`${controlKey}-${String(option)}`}
                  style={{ marginLeft: "0.3em" }}
                >
                  {String(option)}
                </label>
              </div>
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
            value={String(globalState.control[controlKey].value)}
            onChange={(e) => {
              dispatch({
                type: ActionType.UpdateControl,
                value: {
                  ...globalState.control,
                  [controlKey]: {
                    ...globalState.control[controlKey],
                    value: coerceString(e.target.value),
                  },
                },
              });
            }}
          >
            <option value="undefined" disabled>
              Choose option...
            </option>
            {(globalState.control[controlKey].options || []).map((option) => (
              <option key={`${option}-${controlKey}`}>{String(option)}</option>
            ))}
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
  if (controlState.type === ControlType.Range) {
    // the fallback values are based on the standard range validation defaults,
    // see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#validation
    const displayMin = controlState.min ?? 0;
    const displayMax = controlState.max ?? 100;

    return (
      <tr>
        <td>
          <label htmlFor={controlKey}>{controlKey}</label>
        </td>
        <td>
          {displayMin}
          <input
            id={controlKey}
            type={getInputType(controlState.type)}
            value={controlState.value}
            min={controlState.min}
            max={controlState.max}
            step={controlState.step}
            onChange={(e) =>
              dispatch({
                type: ActionType.UpdateControl,
                value: {
                  ...globalState.control,
                  [controlKey]: {
                    ...controlState,
                    value: getInputValue(e.target, controlState.type),
                  },
                },
              })
            }
          />
          {controlState.value} / {displayMax}
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
