import * as React from "react";
import { useLadleState } from "./context";
import { ActionType, ControlType, ControlState } from "../../shared/types";

const ArgsProvider: React.FC<{
  component: any;
  args: any;
  argTypes: any;
}> = ({ component, args, argTypes }) => {
  const [globalState, dispatch] = useLadleState();
  React.useEffect(() => {
    const controls: ControlState = {};
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
  return React.createElement(component, props);
};

export default ArgsProvider;
