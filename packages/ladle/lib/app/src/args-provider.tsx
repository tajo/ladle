import * as React from "react";
import { useLadleContext } from "./context";
import { getQuery } from "./addons/control";
import { ActionType, ControlType, ControlState } from "../../shared/types";

const ALLOWED_ARGTYPES = [
  "select",
  "multi-select",
  "radio",
  "inline-radio",
  "background",
  "check",
  "inline-check",
  "range",
  "color",
  "date",
  "number",
  "text",
  "boolean",
];

const ArgsProvider = ({
  component,
  args,
  argTypes,
}: {
  component: any;
  args: any;
  argTypes: any;
}) => {
  const { globalState, dispatch } = useLadleContext();
  const actionLogger = (name: string) => (event: Event) => {
    dispatch({
      type: ActionType.UpdateAction,
      value: { name, event },
      clear: false,
    });
  };
  React.useEffect(() => {
    const controls: ControlState = {};
    let bgControls = 0;
    args &&
      Object.keys(args).forEach((argKey) => {
        const argValue = args[argKey];
        if (globalState.control[argKey]) {
          controls[argKey] = {
            type: globalState.control[argKey].type,
            defaultValue: argValue,
            value: globalState.control[argKey].value,
            description: "",
          };
        } else {
          let type = ControlType.Complex;
          switch (typeof argValue) {
            case "function":
              type = ControlType.Function;
              break;
            case "boolean":
              type = ControlType.Boolean;
              break;
            case "number":
              type = ControlType.Number;
              break;
            case "string":
              type = ControlType.String;
              break;
          }
          controls[argKey] = {
            type,
            defaultValue: argValue,
            value: argValue,
            description: "",
          };
        }
      });
    argTypes &&
      Object.keys(argTypes).forEach((argKey) => {
        const argValue = argTypes[argKey];
        if (argValue && argValue.action) {
          controls[argKey] = {
            type: ControlType.Action,
            defaultValue: actionLogger(argKey),
            value: actionLogger(argKey),
            description: "",
          };
          return;
        }
        if (!argValue.control || !argValue.control.type) {
          throw new Error("argTypes should have control type specified");
        }
        if (ALLOWED_ARGTYPES.indexOf(argValue.control.type) === -1) {
          throw new Error(
            `only ${ALLOWED_ARGTYPES.join(
              ", ",
            )} argTypes are supported now. For strings, booleans and numbers use just args.`,
          );
        }
        if (argValue.control.type === "background") {
          bgControls++;
          if (bgControls > 1) {
            throw new Error(
              "There can be only single argType with the type background since it's used to change Ladle's background color.",
            );
          }
        }
        controls[argKey] = {
          name: argValue.name,
          type: argValue.control.type,
          labels: argValue.control.labels,
          defaultValue:
            args[argKey] === undefined ? argValue.defaultValue : args[argKey],
          options: argValue.options,
          value:
            args[argKey] === undefined ? argValue.defaultValue : args[argKey],
          description: argValue.description || argKey,
          min: argValue.control.min,
          max: argValue.control.max,
          step: argValue.control.step,
        };
        if (globalState.control[argKey]) {
          controls[argKey].value = globalState.control[argKey].value;
        }
      });
    if (Object.keys(controls).length) {
      const urlValues = getQuery(location.search, controls);
      Object.keys(urlValues).forEach((key) => {
        controls[key].value = urlValues[key].value;
      });
      if (
        Object.keys(controls).some(
          (key) =>
            !globalState.control[key] ||
            controls[key].value !== globalState.control[key].value,
        )
      ) {
        dispatch({
          type: ActionType.UpdateControl,
          value: controls,
        });
      }
    } else {
      if (!globalState.controlInitialized) {
        dispatch({
          type: ActionType.UpdateControlIntialized,
          value: true,
        });
      }
    }
  }, []);

  const mappingValue = (key: string, value: any) => {
    if (
      argTypes &&
      argTypes[key] &&
      argTypes[key].mapping &&
      Object.prototype.hasOwnProperty.call(argTypes[key].mapping, value)
    ) {
      return argTypes[key].mapping[value];
    }
    return value;
  };

  const props: any = {};
  Object.keys(globalState.control).forEach((key) => {
    if (Array.isArray(globalState.control[key].value)) {
      props[key] = globalState.control[key].value.map((value: any) =>
        mappingValue(key, value),
      );
    } else {
      props[key] = mappingValue(key, globalState.control[key].value);
    }
  });

  if (!globalState.controlInitialized) {
    return null;
  }
  return React.createElement(component, props);
};

export default ArgsProvider;
