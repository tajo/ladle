import * as React from "react";
import config from "./get-config";
import { useLadleContext } from "./context";
import { ActionType, ControlType, ControlState } from "../../shared/types";

const ArgsProvider = ({
  component,
  decorator,
  args,
  argTypes,
}: {
  component: any;
  args: any;
  argTypes: any;
  decorator: any;
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
        if (
          argValue.control.type !== "select" &&
          argValue.control.type !== "radio"
        ) {
          throw new Error("only select and radio argTypes are supported now");
        }
        if (globalState.control[argKey]) {
          controls[argKey] = {
            type: globalState.control[argKey].type,
            defaultValue: argValue.defaultValue || argValue.options[0],
            value: globalState.control[argKey].value,
            options: argValue.options,
            description: "",
          };
        } else {
          controls[argKey] = {
            type: argValue.control.type,
            defaultValue: argValue.defaultValue || argValue.options[0],
            options: argValue.options,
            value: argValue.defaultValue || argValue.options[0],
            description: argValue.name || argKey,
          };
        }
      });
    if (Object.keys(controls).length) {
      dispatch({ type: ActionType.UpdateControl, value: controls });
    }
  }, []);
  const props: any = {};
  Object.keys(globalState.control).forEach((key) => {
    if (!globalState.control[key].type) {
      props[key] = globalState.control[key].value;
    } else {
      props[key] = globalState.control[key].value;
    }
  });

  // make sure we don't render story before args are passed through the state
  if (
    Object.keys(globalState.control).length <
    Math.max(
      args ? Object.keys(args).length : 0,
      argTypes ? Object.keys(argTypes).length : 0,
    )
  ) {
    return null;
  }
  return decorator(() => React.createElement(component, props), {
    globalState,
    dispatch,
    config,
  });
};

export default ArgsProvider;
