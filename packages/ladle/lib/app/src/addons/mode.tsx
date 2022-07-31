import * as React from "react";
import queryString from "query-string";
import { Maximize } from "../icons";
import { ModeState, AddonProps, ActionType } from "../../../shared/types";
import config from "../get-config";
import Tooltip from "@reach/tooltip";

export const getQuery = (locationSearch: string) => {
  const mode = queryString.parse(locationSearch).mode as string;
  switch (mode) {
    case ModeState.Full:
      return ModeState.Full;
    case ModeState.Preview:
      return ModeState.Preview;
    default:
      return config.addons.mode.defaultState;
  }
};

export const Button: React.FC<AddonProps> = ({ dispatch }) => {
  const label =
    "Open fullscreen mode. It removes all other styles and wrappers.";
  return (
    <li>
      <Tooltip label={label}>
        <button
          aria-label={label}
          type="button"
          onClick={() =>
            dispatch({ type: ActionType.UpdateMode, value: ModeState.Preview })
          }
        >
          <Maximize />
        </button>
      </Tooltip>
    </li>
  );
};
