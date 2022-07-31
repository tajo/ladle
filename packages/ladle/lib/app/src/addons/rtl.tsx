import * as React from "react";
import queryString from "query-string";
import { Rtl } from "../icons";
import { AddonProps, ActionType } from "../../../shared/types";
import config from "../get-config";
import Tooltip from "@reach/tooltip";

export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).rtl;
  if (urlVal === "true") return true;
  if (urlVal === "false") return false;
  return config.addons.rtl.defaultState;
};

export const Button: React.FC<AddonProps> = ({ dispatch, globalState }) => {
  const rtlText = "Switch text direction to right to left.";
  const ltrText = "Switch text direction to left to right.";
  const label = globalState.rtl ? ltrText : rtlText;
  return (
    <li>
      <Tooltip label={label}>
        <button
          aria-label={label}
          onClick={() =>
            dispatch({ type: ActionType.UpdateRtl, value: !globalState.rtl })
          }
        >
          <Rtl />
        </button>
      </Tooltip>
    </li>
  );
};
