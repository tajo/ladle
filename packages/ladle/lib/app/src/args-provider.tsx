import * as React from "react";
import { useLadleContext } from "./context";
import { getQuery } from "./addons/control";
import {
  ActionType,
  ControlType,
  ControlState,
  GlobalState,
} from "../../shared/types";

const ALLOWED_ARGTYPES = [
  "select",
  "multi-select",
  "radio",
  "inline-radio",
  "check",
  "inline-check",
];

export const areControlsInitialized = (
  globalState: GlobalState,
  args: any,
  argTypes: any,
) =>
  Object.keys(globalState.control).length >=
  Math.max(
    args ? Object.keys(args).length : 0,
    argTypes ? Object.keys(argTypes).length : 0,
  );

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
  const actionLogger = (name: String) => (event: Event) => {
    dispatch({
      type: ActionType.UpdateAction,
      value: { name, event },
      clear: false,
    });
  };
  React.useEffect(() => {
    const controls: ControlState = {};
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
        controls[argKey] = {
          type: argValue.control.type,
          defaultValue: args[argKey] ? args[argKey] : argValue.defaultValue,
          options: argValue.options,
          value: args[argKey] ? args[argKey] : argValue.defaultValue,
          description: argValue.description || argKey,
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
      dispatch({
        type: ActionType.UpdateControl,
        value: controls,
      });
    }
  }, []);

  const props: any = {};
  Object.keys(globalState.control).forEach((key) => {
    props[key] = globalState.control[key].value;
  });

  if (!areControlsInitialized(globalState, args, argTypes)) {
    return null;
  }
  return React.createElement(component, props);
};

export default ArgsProvider;
